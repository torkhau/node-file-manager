import { cwd, stdin as input, stdout as output } from 'node:process';
import { Interface } from 'node:readline';
import { FileManagerError } from './utils/errors.js';

export class ComandLineInterface extends Interface {
  #username = 'anonymous';

  constructor() {
    super({ input, output });
    this.#start();
    this.on('line', (line) => {
      const command = line.trim();

      if (command === '.exit') {
        this.#exit();
      } else {
        console.log(`You entered: ${line}`);
        this.prompt();
      }
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
    this.#updatePrompt();
    this.prompt();
  }

  #exit() {
    console.info(`\nThank you for using File Manager, ${this.username}, goodbye!`);
    process.exit(0);
  }

  #updatePrompt() {
    this.setPrompt(`${cwd()} |--> `);
  }
}
