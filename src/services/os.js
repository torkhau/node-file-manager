import { arch, cpus, EOL, homedir, userInfo } from 'node:os';

const paramMap = {
  '--architecture': () => console.log(arch()),
  '--cpus': () => console.table(cpus(), ['model', 'speed']),
  '--eol': () => console.log(EOL === '\n' ? '\\n' : '\\r\\n'),
  '--homedir': () => console.log(homedir()),
  '--username': () => console.log(userInfo().username),
};

export function getOSInfo(param) {
  if (param.length === 0) {
    console.log(`Invalid input`);
    return;
  }

  const normalizedParam = param[0].trim().toLowerCase();

  if (typeof paramMap[normalizedParam] === 'function') {
    paramMap[normalizedParam]();
  } else {
    console.log(`Invalid input`);
  }
}
