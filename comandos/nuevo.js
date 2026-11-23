const fs = require('fs');
const path = require('path');
const { raiz } = require('../lib/config');
const { slug } = require('../lib/texto');
const { siguienteNumero, nombresProyectos } = require('../lib/proyectos');

exports.command = 'nuevo <nombre>';
exports.describe = 'Crea NNN-nombre/_analisis/img/ con el siguiente número';
exports.builder = (y) => y.positional('nombre', { type: 'string' });
exports.handler = async ({ nombre }) => {
  const s = slug(nombre);
  if (!s) throw new Error('El nombre no genera un slug válido.');
  const dir = path.join(raiz, `${siguienteNumero(nombresProyectos())}-${s}`);
  if (fs.existsSync(dir)) throw new Error(`Ya existe: ${dir}`);
  fs.mkdirSync(path.join(dir, '_analisis', 'img'), { recursive: true });
  console.log(dir);
};
