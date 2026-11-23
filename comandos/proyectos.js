const path = require('path');
const { raiz } = require('../lib/config');
const { nombresProyectos, ramaGit, tieneDocx } = require('../lib/proyectos');

exports.command = 'proyectos';
exports.describe = 'Lista los proyectos NNN-nombre de la raíz';
exports.builder = {};
exports.handler = async () => {
  const filas = nombresProyectos().map((n) => {
    const dir = path.join(raiz, n);
    return [n, ramaGit(dir), tieneDocx(dir) ? 'sí' : 'no'];
  });
  if (!filas.length) return console.log('No hay proyectos.');
  const todas = [['PROYECTO', 'RAMA', 'DOCX'], ...filas];
  const anchos = todas[0].map((_, i) => Math.max(...todas.map((f) => f[i].length)));
  for (const f of todas) console.log(f.map((c, i) => c.padEnd(anchos[i])).join('  ').trimEnd());
};
