import sharp from 'sharp';

const AVATAR_SIZE = 100;
const MAX_SOURCE_BYTES = 5 * 1024 * 1024;

export async function fetchOAuthAvatarDataUrl(
  avatarUrl: string | null | undefined,
): Promise<string | null> {
  if (!avatarUrl) {
    return null;
  }

  try {
    const response = await fetch(avatarUrl);

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.startsWith('image/')) {
      return null;
    }

    const source = Buffer.from(await response.arrayBuffer());
    if (source.byteLength === 0 || source.byteLength > MAX_SOURCE_BYTES) {
      return null;
    }

    const resized = await sharp(source)
      .rotate()
      .resize(AVATAR_SIZE, AVATAR_SIZE, {
        fit: 'cover',
        position: 'centre',
      })
      .webp({ quality: 90 })
      .toBuffer();

    return `data:image/webp;base64,${resized.toString('base64')}`;
  } catch {
    return null;
  }
}
