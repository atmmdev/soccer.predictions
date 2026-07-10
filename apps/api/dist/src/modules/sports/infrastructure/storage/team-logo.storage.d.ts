export declare class TeamLogoStorage {
    private readonly logger;
    private readonly storageDir;
    private readonly inFlight;
    private readonly resolver;
    private readonly resolve4;
    constructor();
    getPublicUrl(externalId: number): string;
    getFilePath(externalId: number): string;
    hasLocalFile(externalId: number): Promise<boolean>;
    readLocalFile(externalId: number): Promise<{
        buffer: Buffer;
        contentType: string;
    } | null>;
    toPublicLogoUrl(externalId: number): string;
    ensureLogo(externalId: number, remoteUrl?: string | null): Promise<string>;
    private downloadLogo;
    private fetchToFile;
}
