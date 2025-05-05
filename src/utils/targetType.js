import { stat } from 'fs/promises';

export const targetType = async (target) => {
  try {
    const stats = await stat(target);

    if (stats.isDirectory()) return 'directory';

    return 'file';
  } catch {
    return undefined;
  }
};
