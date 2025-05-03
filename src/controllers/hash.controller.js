import { hash } from '../services/hash.service.js';
import { FileManagerError, normalizePath, targetType } from '../utils/index.js';

export const handleHashCommand = async (args) => {
  const path = normalizePath(args[0]);
  const type = await targetType(path);

  if (type !== 'file') throw FileManagerError.INVALID_INPUT;

  args = [path];
  const result = await hash(args);

  if (result) console.log(result);
};
