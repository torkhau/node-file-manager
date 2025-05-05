import { createReadStream, createWriteStream } from 'fs';
import { basename, join } from 'path';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { FileManagerError } from '../utils/index.js';

export async function compress([source, destination]) {
  try {
    const fileName = basename(source);
    destination = join(destination, `${fileName}.br`);

    await pipeline(createReadStream(source), createBrotliCompress(), createWriteStream(destination));
  } catch {
    throw FileManagerError.OPERATION_FAILED;
  }
}

export async function decompress([source, destination]) {
  try {
    const fileName = basename(source, '.br');
    destination = join(destination, fileName);

    await pipeline(createReadStream(source), createBrotliDecompress(), createWriteStream(destination));
  } catch {
    throw FileManagerError.OPERATION_FAILED;
  }
}
