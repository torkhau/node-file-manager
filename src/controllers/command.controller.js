import { getOSInfo } from '../services/os.js';

const commandMap = {
  nwd: '',

  os: getOSInfo,
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
    case 'os':
      commandMap['os'](args);
      break;
    default:
      console.log(`Invalid input`);
  }
}
