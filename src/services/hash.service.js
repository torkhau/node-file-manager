import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { FileManagerError } from '../utils/index.js';

export async function hash([path]) {
  const hash = createHash('sha256');

  try {
    const writableStream = async (source) => {
      for await (const chunk of source) hash.update(chunk);
    };

    await pipeline(createReadStream(path), writableStream);
  } catch {
    throw FileManagerError.OPERATION_FAILED;
  }

  return hash.digest('hex');
}
