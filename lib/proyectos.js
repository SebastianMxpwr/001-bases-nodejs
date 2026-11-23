const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { raiz } = require('./config');

const RE_PROYECTO = /^\d{3}-/;

const siguienteNumero = (nombres) => {
  const nums = nombres.filter((n) => RE_PROYECTO.test(n)).map((n) => parseInt(n.slice(0, 3), 10));
  return String((nums.length ? Math.max(...nums) : 0) + 1).padStart(3, '0');
};

// Devuelve las coincidencias; quien llama decide qué hacer con 0 o más de 1.
const buscarProyecto = (nombres, consulta) => {
  const q = String(consulta).trim().toLowerCase();
  if (/^\d+$/.test(q)) return nombres.filter((n) => parseInt(n.slice(0, 3), 10) === parseInt(q, 10));
  return nombres.filter((n) => n.toLowerCase().includes(q));
};

const nombresProyectos = () =>
  fs.readdirSync(raiz, { withFileTypes: true })
    .filter((d) => d.isDirectory() && RE_PROYECTO.test(d.name))
    .map((d) => d.name)
    .sort();

const ramaGit = (dir) => {
  try {
    return execFileSync('git', ['-C', dir, 'rev-parse', '--abbrev-ref', 'HEAD'], {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return '-';
  }
};

const tieneDocx = (dir) => {
  try {
    return fs.readdirSync(path.join(dir, '_analisis')).some((f) => f.toLowerCase().endsWith('.docx'));
  } catch {
    return false;
  }
};

// Resuelve una consulta a un único proyecto o lanza Error con la lista.
const resolverProyecto = (consulta) => {
  const todos = nombresProyectos();
  const m = buscarProyecto(todos, consulta);
  if (m.length === 1) return m[0];
  const lista = (m.length ? m : todos).map((n) => `  ${n}`).join('\n');
  throw new Error(
    m.length
      ? `"${consulta}" coincide con varios proyectos:\n${lista}`
      : `Ningún proyecto coincide con "${consulta}". Proyectos:\n${lista}`
  );
};

module.exports = { siguienteNumero, buscarProyecto, nombresProyectos, ramaGit, tieneDocx, resolverProyecto };
