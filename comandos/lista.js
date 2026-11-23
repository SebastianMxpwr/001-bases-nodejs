// Qué aprendes aquí:
// - Un módulo de comando de yargs: command, describe, builder y handler.
// - Opciones con alias, valor por defecto y type: 'number'.
import { generarTabla, formatear } from '../lib/tabla.js';

export default {
  command: 'lista',
  describe: 'Imprime en pantalla la tabla de multiplicar',
  builder: (yargs) =>
    yargs
      .option('base', { alias: 'b', type: 'number', demandOption: true, describe: 'Número a multiplicar' })
      .option('limite', { alias: 'l', type: 'number', default: 10, describe: 'Hasta qué número multiplicar' }),
  handler: async ({ base, limite }) => {
    console.log(formatear(generarTabla(base, limite), 'txt'));
  },
};
