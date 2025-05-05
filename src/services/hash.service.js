import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { FileManagerError } from '../utils/index.js';

export async function hash([path]) {
  const hash = createHash('sha256');

  try {
    await pipeline(createReadStream(path), async (source) => {
      for await (const chunk of source) hash.update(chunk);
    });
  } catch {
    throw FileManagerError.OPERATION_FAILED;
  }

  return hash.digest('hex');
}
