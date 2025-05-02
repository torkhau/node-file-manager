import { readdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { chdir, cwd } from 'node:process';

const NWDCommandMap = {
  up: () => chdir(dirname(cwd())),
  cd: ([path]) => chdir(path),
  ls: async () => {
    const arrDirent = await readdir(cwd(), { withFileTypes: true });
    const directories = arrDirent
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .sort()
      .map((name) => ({ Name: name, Type: 'directory' }));
    const files = arrDirent
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name)
      .sort()
      .map((name) => ({ Name: name, Type: 'file' }));

    return [...directories, ...files];
  },
};

export async function nwd(command, args) {
  if (command in NWDCommandMap) return await NWDCommandMap[command](args);

  return undefined;
}
