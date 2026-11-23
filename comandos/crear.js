// Qué aprendes aquí:
// - choices: yargs rechaza valores fuera de la lista por ti.
// - async/await con fs/promises: mkdir recursivo y writeFile.
// - Rutas absolutas: el archivo cae junto a la app sin importar el cwd.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { generarTabla, formatear } from '../lib/tabla.js';
import { rutaTabla } from '../lib/rutas.js';

export default {
  command: 'crear',
  describe: 'Crea un archivo con la tabla de multiplicar',
  builder: (yargs) =>
    yargs
      .option('base', { alias: 'b', type: 'number', demandOption: true, describe: 'Número a multiplicar' })
      .option('limite', { alias: 'l', type: 'number', default: 10, describe: 'Hasta qué número multiplicar' })
      .option('formato', { alias: 'f', choices: ['txt', 'json', 'csv'], default: 'txt', describe: 'Formato del archivo' })
      .option('salida', { alias: 's', type: 'string', describe: 'Carpeta de salida (por defecto Tablas/)' }),
  handler: async ({ base, limite, formato, salida }) => {
    const contenido = formatear(generarTabla(base, limite), formato);
    const ruta = rutaTabla(base, formato, salida);
    await mkdir(dirname(ruta), { recursive: true });
    await writeFile(ruta, contenido + '\n');
    console.log(`Archivo creado: ${ruta}`);
  },
};
