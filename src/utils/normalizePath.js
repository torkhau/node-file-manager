import { isAbsolute, resolve } from 'node:path';
import { cwd } from 'node:process';
import { FileManagerError } from './errors.js';

export const normalizePath = (path) => {
  if (!path) throw FileManagerError.INVALID_INPUT;

  let normalizedParh = path.trim();

  if (!normalizedParh) throw FileManagerError.INVALID_INPUT;

  if (!isAbsolute(normalizedParh)) normalizedParh = resolve(cwd(), normalizedParh);

  return normalizedParh;
};
