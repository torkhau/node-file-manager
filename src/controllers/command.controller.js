import { getOSInfo } from '../services/os.js';

const commandMap = {
  nwd: '',
  files: '',
  os: getOSInfo,
  hash: '',
  archiv: '', 
};

export async function handleCommand(command) {
  if (command.length === 0) return;

  const [cmd, ...args] = command.split(' ');
  const cmdIndex = cmd.trim().toLowerCase();

  switch (cmdIndex) {
    case 'up':
    case 'cd':
    case 'ls':
      commandMap['nwd'](args);
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
