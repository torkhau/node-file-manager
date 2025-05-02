import { isAbsolute, resolve } from 'node:path';
import { cwd } from 'node:process';
import { nwd } from '../services/nwd.service.js';
import { FileManagerError, targetType } from '../utils/index.js';

export const handleNWDCommand = async (command, args) => {
  if (command === 'cd') {
    if (!args[0]) throw FileManagerError.INVALID_INPUT;

    let normalizedParh = args[0].trim();

    if (!normalizedParh) throw FileManagerError.INVALID_INPUT;

    if (!isAbsolute(normalizedParh)) normalizedParh = resolve(cwd(), normalizedParh);

    const type = await targetType(normalizedParh);

    if (type !== 'directory') throw FileManagerError.INVALID_INPUT;

    args = [normalizedParh];
  }

  const result = await nwd(command, args);

  if (result) console.table(result);
};
