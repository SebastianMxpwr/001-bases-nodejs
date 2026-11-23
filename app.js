import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import lista from './comandos/lista.js';
import crear from './comandos/crear.js';
import leer from './comandos/leer.js';
import archivos from './comandos/archivos.js';
import preguntar from './comandos/preguntar.js';

try {
  await yargs(hideBin(process.argv))
    .command(lista)
    .command(crear)
    .command(leer)
    .command(archivos)
    .command(preguntar)
    .locale('es') // mensajes de yargs en español
    .strict()
    .demandCommand(1, 'Indica un comando. Usa --help para ver cuáles hay.')
    .fail((msg, err, y) => {
      // Sin err es un error de uso (argumento faltante, comando desconocido): muestra la ayuda.
      if (!err) y.showHelp('error');
      throw err ?? new Error(msg);
    })
    .help()
    .alias('h', 'help')
    .parseAsync();
} catch (error) {
  // Aquí llegan tanto los errores de los handlers como los de uso de yargs.
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
