import { getOSInfo } from '../services/os.js';
import { nwd } from '../services/nwd.js';

const commandMap = {
  nwd,
  files: '',
  os: getOSInfo,
  hash: '',
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
      await commandMap['nwd'](normalizedCommand, args);
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
      commandMap['os'](args);
      break;
    case 'hash':
      commandMap['hash'](args);
      break;
    case 'compress':
    case 'decompress':
      commandMap['archiv'](args);
      break;
    default:
      console.log(`Invalid input`);
  }
}
