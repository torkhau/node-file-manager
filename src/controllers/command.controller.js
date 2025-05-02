import { getOSInfo } from '../services/os.js';

const commandMap = {
  'os': getOSInfo,
};

export async function handleCommand(command) {
  if (command.length === 0) return;

  const [cmd, ...args] = command.split(' ');
  const cmdIndex = cmd.trim().toLowerCase();

  if (commandMap[cmdIndex]) {
    commandMap[cmdIndex](args);
  } else {
    console.log(`Invalid input`);
  }
}