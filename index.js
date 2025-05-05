import { exit } from 'node:process';
import { ComandLineInterface } from './src/comandLineInterface.js';

try {
  new ComandLineInterface();
} catch (error) {
  console.error(error.message);
  exit(1);
}
