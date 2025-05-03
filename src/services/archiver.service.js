import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { FileManagerError } from '../utils/index.js';

export async function compress([pathFile, pathDestination]) {
  try {
    await pipeline(createReadStream(pathFile), createBrotliCompress(), createWriteStream(pathDestination));
  } catch {
    throw FileManagerError.OPERATION_FAILED;
  }
}

export async function decompress([pathFile, pathDestination]) {
  try {
    await pipeline(createReadStream(pathFile), createBrotliDecompress(), createWriteStream(pathDestination));
  } catch {
    throw FileManagerError.OPERATION_FAILED;
  }
}
