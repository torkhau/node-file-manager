import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, open, rename, rm } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { FileManagerError } from '../utils/index.js';

const FileCommandMap = {
  cat: async ([path]) => {
    try {
      await pipeline(createReadStream(path, 'utf8'), async (source) => {
        for await (const chunk of source) {
          process.stdout.write(chunk.toString());
        }
      });
    } catch {
      throw FileManagerError.OPERATION_FAILED;
    }
  },
  add: async ([path]) => {
    try {
      const fileHandle = await open(path, 'wx');
      await fileHandle.close();
    } catch (error) {
      if (error.code === 'EEXIST') throw new FileManagerError('File already exists');

      if (error.code === 'EPERM') throw new FileManagerError('Permission denied');

      throw FileManagerError.OPERATION_FAILED;
    }
  },
  mkdir: async ([path]) => {
    try {
      await mkdir(path);
    } catch (error) {
      if (error.code === 'EEXIST') throw new FileManagerError('Directory already exists');

      throw FileManagerError.OPERATION_FAILED;
    }
  },
  rn: async ([oldPath, newPath]) => {
    try {
      await rename(oldPath, newPath);
    } catch {
      throw FileManagerError.OPERATION_FAILED;
    }
  },
  cp: async ([source, destination]) => {
    try {
      const fileName = basename(source);
      destination = join(destination, fileName);

      await pipeline(createReadStream(source), createWriteStream(destination));
    } catch {
      throw FileManagerError.OPERATION_FAILED;
    }
  },
  mv: async ([source, destination]) => {
    try {
      await FileCommandMap.cp([source, destination]);
      await FileCommandMap.rm([source]);
    } catch (error) {
      throw error;
    }
  },
  rm: async ([path]) => {
    try {
      await rm(path);
    } catch (error) {
      if (error.code === 'EPERM') throw new FileManagerError('Permission denied');

      throw FileManagerError.OPERATION_FAILED;
    }
  },
};

export async function file(command, args) {
  if (command in FileCommandMap) return await FileCommandMap[command](args);

  return undefined;
}
