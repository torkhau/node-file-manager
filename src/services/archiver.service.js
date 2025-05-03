import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { FileManagerError } from '../utils/index.js';

export async function compress([source, destination]) {
  try {
    await pipeline(createReadStream(source), createBrotliCompress(), createWriteStream(destination));
  } catch {
    throw FileManagerError.OPERATION_FAILED;
  }
}

export async function decompress([source, destination]) {
  try {
    await pipeline(createReadStream(source), createBrotliDecompress(), createWriteStream(destination));
  } catch {
    throw FileManagerError.OPERATION_FAILED;
  }
}
