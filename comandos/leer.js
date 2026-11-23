// Qué aprendes aquí:
// - Leer un archivo con readFile.
// - try/catch con await y distinguir el error por su código (ENOENT = no existe).
import { readFile } from 'node:fs/promises';
import { rutaTabla } from '../lib/rutas.js';

export default {
  command: 'leer',
  describe: 'Lee una tabla ya creada con el comando crear',
  builder: (yargs) =>
    yargs
      .option('base', { alias: 'b', type: 'number', demandOption: true, describe: 'Base de la tabla a leer' })
      .option('formato', { alias: 'f', choices: ['txt', 'json', 'csv'], default: 'txt', describe: 'Formato del archivo' })
      .option('salida', { alias: 's', type: 'string', describe: 'Carpeta donde buscar (por defecto Tablas/)' }),
  handler: async ({ base, formato, salida }) => {
    const ruta = rutaTabla(base, formato, salida);
    try {
      console.log(await readFile(ruta, 'utf8'));
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`No existe ${ruta}. Créala primero con: npm start -- crear -b ${base} -f ${formato}`);
      }
      throw error;
    }
  },
};
