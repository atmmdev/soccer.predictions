import { Injectable, Logger } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { access, readFile } from 'fs/promises';
import https from 'https';
import { Resolver } from 'dns';
import { promisify } from 'util';
import path from 'path';
import { pipeline } from 'stream/promises';

const MEDIA_HOST = 'media.api-sports.io';
const DNS_SERVERS = ['8.8.8.8', '1.1.1.1'];

@Injectable()
export class TeamLogoStorage {
  private readonly logger = new Logger(TeamLogoStorage.name);
  private readonly storageDir = path.join(
    process.cwd(),
    'storage',
    'team-logos',
  );
  private readonly inFlight = new Map<number, Promise<string | null>>();
  private readonly resolver = new Resolver();
  private readonly resolve4: (hostname: string) => Promise<string[]>;

  constructor() {
    this.resolver.setServers(DNS_SERVERS);
    this.resolve4 = promisify(this.resolver.resolve4.bind(this.resolver));

    if (!existsSync(this.storageDir)) {
      mkdirSync(this.storageDir, { recursive: true });
    }
  }

  getPublicUrl(externalId: number): string {
    return `/api/media/teams/${externalId}`;
  }

  getFilePath(externalId: number): string {
    return path.join(this.storageDir, `${externalId}.png`);
  }

  async hasLocalFile(externalId: number): Promise<boolean> {
    try {
      await access(this.getFilePath(externalId));
      return true;
    } catch {
      return false;
    }
  }

  async readLocalFile(
    externalId: number,
  ): Promise<{ buffer: Buffer; contentType: string } | null> {
    try {
      const buffer = await readFile(this.getFilePath(externalId));
      return { buffer, contentType: 'image/png' };
    } catch {
      return null;
    }
  }

  toPublicLogoUrl(externalId: number): string {
    return this.getPublicUrl(externalId);
  }

  async ensureLogo(
    externalId: number,
    remoteUrl?: string | null,
  ): Promise<string> {
    if (await this.hasLocalFile(externalId)) {
      return this.getPublicUrl(externalId);
    }

    const pending = this.inFlight.get(externalId);

    if (pending) {
      await pending;
      return this.getPublicUrl(externalId);
    }

    const downloadPromise = this.downloadLogo(externalId, remoteUrl).finally(
      () => {
        this.inFlight.delete(externalId);
      },
    );

    this.inFlight.set(externalId, downloadPromise);
    await downloadPromise;

    return this.getPublicUrl(externalId);
  }

  private async downloadLogo(
    externalId: number,
    remoteUrl?: string | null,
  ): Promise<string | null> {
    const sourceUrl =
      remoteUrl && remoteUrl.startsWith('http')
        ? remoteUrl
        : `https://${MEDIA_HOST}/football/teams/${externalId}.png`;

    try {
      await this.fetchToFile(sourceUrl, this.getFilePath(externalId));
      return this.getPublicUrl(externalId);
    } catch (error) {
      const detail =
        error instanceof Error ? error.message : 'erro desconhecido';
      this.logger.warn(
        `Falha ao baixar logo do time ${externalId}: ${detail}`,
      );
      return null;
    }
  }

  private async fetchToFile(url: string, destination: string): Promise<void> {
    const parsed = new URL(url);
    const addresses = await this.resolve4(parsed.hostname);
    const ip = addresses[0];

    if (!ip) {
      throw new Error(`DNS sem endereço para ${parsed.hostname}`);
    }

    await new Promise<void>((resolve, reject) => {
      const request = https.get(
        {
          host: ip,
          servername: parsed.hostname,
          path: `${parsed.pathname}${parsed.search}`,
          headers: {
            Host: parsed.hostname,
            'User-Agent':
              'Mozilla/5.0 (compatible; SoccerPredictions/1.0)',
            Accept: 'image/png,image/*;q=0.8,*/*;q=0.5',
          },
        },
        async response => {
          if (
            response.statusCode &&
            response.statusCode >= 300 &&
            response.statusCode < 400 &&
            response.headers.location
          ) {
            response.resume();

            try {
              await this.fetchToFile(response.headers.location, destination);
              resolve();
            } catch (redirectError) {
              reject(redirectError);
            }

            return;
          }

          if (response.statusCode !== 200) {
            response.resume();
            reject(
              new Error(
                `HTTP ${response.statusCode ?? 'unknown'} ao baixar ${url}`,
              ),
            );
            return;
          }

          try {
            await pipeline(response, createWriteStream(destination));
            resolve();
          } catch (streamError) {
            reject(streamError);
          }
        },
      );

      request.on('error', reject);
    });
  }
}
