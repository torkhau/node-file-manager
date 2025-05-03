import { FileManagerError } from '../utils/index.js';
import { handleHashCommand } from './hash.controller.js';
import { handleNWDCommand } from './nwd.controller.js';
import { handleOSCommand } from './os.controller.js';

const commandMap = {
  files: '',
  archiv: '',
};

export async function handleCommand(command) {
  if (command.length === 0) return;

  const [cmd, ...args] = command.split(/\s+/);
  const normalizedCommand = cmd.trim().toLowerCase();

  switch (normalizedCommand) {
    case 'up':
    case 'cd':
    case 'ls':
      await handleNWDCommand(normalizedCommand, args);
      break;
    case 'cat':
    case 'add':
    case 'mkdir':
    case 'rn':
    case 'cp':
    case 'mv':
    case 'rm':
      commandMap['files'](args);
      break;
    case 'os':
      handleOSCommand(args);
      break;
    case 'hash':
      await handleHashCommand(args);
      break;
    case 'compress':
    case 'decompress':
      commandMap['archiv'](args);
      break;
    default:
      throw FileManagerError.INVALID_INPUT;
  }
}
