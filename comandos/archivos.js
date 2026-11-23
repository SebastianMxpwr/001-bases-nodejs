// Qué aprendes aquí:
// - Concurrencia con Promise.all: todos los stat se piden a la vez.
// - Un `for await` (o await dentro de un for) los haría uno tras otro, y tardaría
//   la suma de los tiempos en vez del más lento.
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { carpetaSalida } from '../lib/rutas.js';

export default {
  command: 'archivos',
  describe: 'Lista los archivos de Tablas/ con tamaño y fecha',
  builder: (yargs) =>
    yargs.option('salida', { alias: 's', type: 'string', describe: 'Carpeta a listar (por defecto Tablas/)' }),
  handler: async ({ salida }) => {
    const carpeta = carpetaSalida(salida);
    let nombres;
    try {
      nombres = await readdir(carpeta);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`Todavía no hay nada en ${carpeta}. Usa el comando crear.`);
        return;
      }
      throw error;
    }
    const datos = await Promise.all(nombres.map((n) => stat(path.join(carpeta, n))));
    nombres.forEach((nombre, k) => {
      console.log(`${nombre}\t${datos[k].size} bytes\t${datos[k].mtime.toLocaleString('es-MX')}`);
    });
  },
};
