import { createReadStream, createWriteStream } from 'fs';
import { basename, join } from 'path';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { FileManagerError } from '../utils/index.js';

export async function compress([source, destination]) {
  try {
    await pipeline(
      createReadStream(source),
      createBrotliCompress(),
      createWriteStream(join(destination, `${basename(source)}.br`))
    );
  } catch {
    throw FileManagerError.OPERATION_FAILED;
  }
}

export async function decompress([source, destination]) {
  try {
    await pipeline(
      createReadStream(source),
      createBrotliDecompress(),
      createWriteStream(join(destination, basename(source, '.br')))
    );
  } catch {
    throw FileManagerError.OPERATION_FAILED;
  }
}
