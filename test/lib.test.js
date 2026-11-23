const test = require('node:test');
const assert = require('node:assert/strict');
const { slug } = require('../lib/texto');
const { siguienteNumero, buscarProyecto } = require('../lib/proyectos');
const { resumirAudit } = require('../lib/audit');
const { formatoDuracion, parseFfprobe } = require('../lib/clips');
const { generarTabla } = require('../lib/tablas');

test('slug: minúsculas, sin acentos, guiones y solo [a-z0-9-]', () => {
  assert.equal(slug('Rediseño Ñandú  Árbol!'), 'rediseno-nandu-arbol');
  assert.equal(slug('¡¿?!'), '');
});

test('siguienteNumero: máximo + 1 con 3 dígitos, ignora lo que no es proyecto', () => {
  assert.equal(siguienteNumero([]), '001');
  assert.equal(siguienteNumero(['001-a', '003-b', '_analisis', 'x-9']), '004');
});

test('buscarProyecto: por número o por parte del nombre', () => {
  const n = ['001-bases-nodejs', '002-bases-web', '010-otro'];
  assert.deepEqual(buscarProyecto(n, '1'), ['001-bases-nodejs']);
  assert.deepEqual(buscarProyecto(n, '010'), ['010-otro']);
  assert.deepEqual(buscarProyecto(n, 'BASES'), ['001-bases-nodejs', '002-bases-web']);
  assert.deepEqual(buscarProyecto(n, 'nada'), []);
});

test('resumirAudit: lee metadata.vulnerabilities y rellena con 0', () => {
  const j = { metadata: { vulnerabilities: { critical: 1, high: 2, moderate: 3, low: 4, total: 10 } } };
  assert.deepEqual(resumirAudit(j), { critica: 1, alta: 2, moderada: 3, baja: 4 });
  assert.deepEqual(resumirAudit({}), { critica: 0, alta: 0, moderada: 0, baja: 0 });
});

test('formatoDuracion y parseFfprobe', () => {
  assert.equal(formatoDuracion(0), '00:00');
  assert.equal(formatoDuracion(65.4), '01:05');
  assert.equal(formatoDuracion(3600), '60:00');
  const txt = JSON.stringify({ streams: [{ width: 1920, height: 1080 }], format: { duration: '12.5' } });
  assert.deepEqual(parseFfprobe(txt), { duracion: 12.5, resolucion: '1920x1080' });
  assert.deepEqual(parseFfprobe('{}'), { duracion: 0, resolucion: '-' });
});

test('generarTabla: formato y validación', () => {
  assert.deepEqual(generarTabla(5, 3), ['5 x 1 = 5', '5 x 2 = 10', '5 x 3 = 15']);
  assert.equal(generarTabla(2).length, 10);
  assert.throws(() => generarTabla(1.5));
  assert.throws(() => generarTabla(2, 0));
  assert.throws(() => generarTabla(2, 1001));
});
