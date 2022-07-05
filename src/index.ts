#!/usr/bin/env node
import { config as loadEnv } from 'dotenv';
import { commands, help } from './commands';

const main = (commands: object): void => {
  const args = process.argv
  const firstArg = 2;
  const lastArg = args.length - 1;

  let command = commands;

  for (let i = firstArg; i < lastArg; i++) {
    command = command[args[i]];

    if (!command) {
      console.log('Invalid command');
      help();
      return;
    }
  }

  if (typeof command === "function") {
    const param = args[lastArg];
    command(param);
    return;
  }

  command = command[args[lastArg]];

  if (typeof command === "function") {
    command();
    return;
  }

  console.log('Incomplete command');
  help();
}

loadEnv();
main(commands);

export default main;