import { readdir } from 'node:fs/promises';
import { dirname, isAbsolute, resolve } from 'node:path';
import { chdir, cwd } from 'node:process';
import { targetType } from '../utils/targetType.js';

const commandMap = {
  up: () => chdir(dirname(cwd())),
  cd: async ([path]) => {
    if (!path) {
      console.log(`Invalid input`);
      return;
    }

    let normalizedParh = path.trim();

    if (!normalizedParh) {
      console.log(`Invalid input`);
      return;
    }

    if (!isAbsolute(normalizedParh)) normalizedParh = resolve(cwd(), normalizedParh);

    const type = await targetType(normalizedParh);

    if (type === 'directory') {
      chdir(normalizedParh);
    } else console.log(`Invalid input`);
  },
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

    console.table([...directories, ...files]);
  },
};

export async function nwd(command, args) {
  if (typeof commandMap[command] === 'function') {
    await commandMap[command](args);
  } else {
    console.log(`Invalid input`);
  }
}
