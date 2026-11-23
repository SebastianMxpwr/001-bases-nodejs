const { generarTabla } = require('../lib/tablas');

exports.command = 'tablas';
exports.describe = 'Imprime la tabla de multiplicar (recuerdo del proyecto original)';
exports.builder = (y) =>
  y
    .option('base', { alias: 'b', type: 'number', demandOption: true, describe: 'Entero a multiplicar' })
    .option('limite', { alias: 'l', type: 'number', default: 10, describe: 'Hasta qué factor (1 a 1000)' });
exports.handler = async ({ base, limite }) => {
  console.log(generarTabla(base, limite).join('\n'));
};
