import { file } from '../services/file.service.js';
import { FileManagerError, normalizePath, targetType } from '../utils/index.js';

export const handleFileCommand = async (command, args) => {
  let [first, second] = args;

  if (!first) throw FileManagerError.INVALID_INPUT;

  switch (command) {
    case 'add':
    case 'mkdir':
      args = [first];
      break;
    case 'cat':
    case 'rm': {
      first = normalizePath(first);
      const type = await targetType(first);

      if (type !== 'file') throw new FileManagerError('File not found');

      args = [first];
      break;
    }
    case 'rn':
    case 'cp':
    case 'mv': {
      if (!second) throw FileManagerError.INVALID_INPUT;

      first = normalizePath(first);
      const firstType = await targetType(first);

      if (firstType !== 'file') throw new FileManagerError('File not found');

      second = normalizePath(second);
      const secondType = await targetType(second);

      if (secondType !== 'directory') throw new FileManagerError('Destination directory not found');

      args = [first, second];
      break;
    }
  }

  await file(command, args);
  if (command !== 'cat') console.log('Operation completed successfully');
};
