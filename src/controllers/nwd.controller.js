import { nwd } from '../services/nwd.service.js';
import { FileManagerError, normalizePath, targetType } from '../utils/index.js';

export const handleNWDCommand = async (command, args) => {
  if (command === 'cd') {
    const path = normalizePath(args[0]);
    const type = await targetType(path);

    if (type !== 'directory') throw FileManagerError.INVALID_INPUT;

    args = [path];
  }

  const result = await nwd(command, args);

  if (result) console.table(result);
};
