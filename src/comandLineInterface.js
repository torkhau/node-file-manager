import { homedir } from 'node:os';
import { chdir, cwd, stdin as input, stdout as output } from 'node:process';
import { Interface } from 'node:readline';
import { handleCommand } from './controllers/main.controller.js';
import { FileManagerError } from './utils/index.js';

export class ComandLineInterface extends Interface {
  #username = 'anonymous';

  constructor() {
    super({ input, output });
    this.#start();
    this.on('line', async (line) => {
      const command = line.trim();

      if (command === '.exit') {
        this.#exit();
      }

      try {
        await handleCommand(command);
      } catch (error) {
        if (error instanceof FileManagerError) {
          console.error(error.message);
        } else {
          console.error('Some critical error happened!', error);
        }
      }

      this.#updatePrompt();
    });
    this.on('SIGINT', () => this.#exit());
  }

  get username() {
    return this.#username;
  }

  #start() {
    const usernameArg = process.argv[2];

    if (!usernameArg) throw FileManagerError.EMPTY_ARGS;

    const username = usernameArg.split('=')[1];

    if (username) {
      this.#username = username;
    } else console.warn('!!!Username not provided, using default username "anonymous"!!!\n');

    console.info(`Welcome to the File Manager, ${this.username}!\n`);

    chdir(homedir());
    this.#updatePrompt();
  }

  #exit() {
    console.info(`\nThank you for using File Manager, ${this.username}, goodbye!`);
    process.exit(0);
  }

  #updatePrompt() {
    this.setPrompt(`You are currently in ${cwd()} |--> `);
    this.prompt();
  }
}
