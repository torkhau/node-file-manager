import { compress, decompress } from '../services/archiver.service.js';
import { FileManagerError, normalizePath, targetType } from '../utils/index.js';

export const handleArchiverCommand = async (command, args) => {
  const source = normalizePath(args[0]);
  const sourceType = await targetType(source);

  if (sourceType !== 'file') throw FileManagerError.FILE_NOT_FOUND;

  const destination = normalizePath(args[1]);
  const destinationType = await targetType(destination);

  if (destinationType !== 'directory') throw FileManagerError.DIR_NOT_FOUND;

  args = [source, destination];

  if (command === 'compress') {
    await compress(args);
  } else await decompress(args);

  console.log('Operation completed successfully');
};
