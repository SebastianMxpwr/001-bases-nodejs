// Qué aprendes aquí:
// - Entrada del usuario con node:readline/promises, sin instalar inquirer.
// - Reutilizar validar() para no duplicar reglas.
// - Leer línea por línea con el iterador del rl funciona igual en teclado y con pipe
//   (rl.question puede perder líneas cuando la entrada llega toda de golpe).
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { validar, generarTabla, formatear } from '../lib/tabla.js';

export default {
  command: 'preguntar',
  describe: 'Te pregunta la base y el límite y muestra la tabla',
  builder: (yargs) => yargs,
  handler: async () => {
    const rl = createInterface({ input: stdin, output: stdout });
    const lineas = rl[Symbol.asyncIterator]();
    const leer = async (texto) => {
      stdout.write(texto);
      return Number((await lineas.next()).value);
    };
    try {
      const base = await leer('Base: ');
      const limite = await leer('Límite: ');
      validar(base, limite);
      console.log(formatear(generarTabla(base, limite), 'txt'));
    } finally {
      rl.close();
    }
  },
};
