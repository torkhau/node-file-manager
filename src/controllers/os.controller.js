import { os } from '../services/os.service.js';
import { FileManagerError } from '../utils/index.js';

export const handleOSCommand = (args) => {
  if (!args[0]) throw FileManagerError.INVALID_INPUT;

  const arg = args[0].toLowerCase();
  const result = os(arg);

  if (arg === '--cpus') {
    console.table(result, ['model', 'speed']);
  } else console.log(result);
};
