import { arch, cpus, EOL, homedir, userInfo } from 'node:os';

const osArgMap = {
  '--architecture': arch,
  '--cpus': cpus,
  '--eol': () => (EOL === '\n' ? '\\n' : '\\r\\n'),
  '--homedir': homedir,
  '--username': () => userInfo().username,
};

export function os(arg) {
  if (arg in osArgMap) return osArgMap[arg]();

  return undefined;
}
