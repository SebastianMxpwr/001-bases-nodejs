#!/usr/bin/env node
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

yargs(hideBin(process.argv))
  .scriptName('sb')
  .commandDir(path.join(__dirname, '..', 'comandos'))
  .strict()
  .demandCommand(1, 'Indica un comando.')
  .help()
  .alias('h', 'help')
  .fail((msg, err) => {
    if (err) throw err; // errores de handlers: los imprime el catch de abajo
    console.error(`Error: ${msg}`);
    process.exitCode = 1;
  })
  .parseAsync()
  .catch((e) => {
    console.error(`Error: ${e.message}`);
    process.exitCode = 1;
  });
