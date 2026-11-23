const fs = require('fs');
const path = require('path');
const { raiz } = require('../lib/config');

exports.command = 'bandeja';
exports.describe = 'Lista las notas de _conocimiento-global/bandeja/';
exports.builder = {};
exports.handler = async () => {
  const dir = path.join(raiz, '_conocimiento-global', 'bandeja');
  const notas = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'leeme.md')
    : [];
  if (!notas.length) return console.log('Bandeja vacía');
  for (const f of notas) {
    const m = fs.readFileSync(path.join(dir, f), 'utf8').match(/^#\s+(.+)$/m);
    const fecha = (f.match(/^\d{4}-\d{2}-\d{2}/) || ['sin fecha'])[0];
    console.log(`${fecha}  ${m ? m[1].trim() : '(sin título)'}`);
  }
  console.log(`\nTotal: ${notas.length}`);
};
