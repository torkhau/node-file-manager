import { FileManagerError } from '../utils/index.js';
import { handleArchiverCommand } from './archiver.controller.js';
import { handleFileCommand } from './file.controller.js';
import { handleHashCommand } from './hash.controller.js';
import { handleNWDCommand } from './nwd.controller.js';
import { handleOSCommand } from './os.controller.js';

export async function handleCommand(command) {
  if (command.length === 0) return;

  const match = command.match(/(?:[^\s"]+|"[^"]*")+/g);
  const [cmd, ...args] = match.map((arg) => arg.replace(/^"|"$/g, '').trim());
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
      await handleFileCommand(normalizedCommand, args);
      break;
    case 'os':
      handleOSCommand(args);
      break;
    case 'hash':
      await handleHashCommand(args);
      break;
    case 'compress':
    case 'decompress':
      await handleArchiverCommand(normalizedCommand, args);
      break;
    default:
      throw FileManagerError.INVALID_INPUT;
  }
}
