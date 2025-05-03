import { compress, decompress } from '../services/archiver.service.js';
import { FileManagerError, normalizePath, targetType } from '../utils/index.js';

export const handleArchiverCommand = async (command, args) => {
  const pathFile = normalizePath(args[0]);
  const pathDestination = normalizePath(args[1]);
  const type = await targetType(pathFile);

  if (type !== 'file') throw FileManagerError.INVALID_INPUT;

  args = [pathFile, pathDestination];
  if (command === 'compress') {
    await compress(args);
  } else await decompress(args);

  console.log('Operation completed successfully');
};
