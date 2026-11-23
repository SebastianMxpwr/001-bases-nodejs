const fs = require('fs');
const path = require('path');
const { raiz } = require('../lib/config');
const { nombresProyectos, resolverProyecto } = require('../lib/proyectos');
const { resumirAudit } = require('../lib/audit');
const { correrNpm } = require('../lib/exec');

exports.command = 'audit [proyecto]';
exports.describe = 'Corre npm audit (solo lectura) en los proyectos con package-lock.json';
exports.builder = (y) => y.positional('proyecto', { type: 'string' });
exports.handler = async ({ proyecto }) => {
  const nombres = proyecto ? [resolverProyecto(proyecto)] : nombresProyectos();
  let revisados = 0;
  for (const n of nombres) {
    const cwd = path.join(raiz, n);
    if (!fs.existsSync(path.join(cwd, 'package-lock.json'))) {
      if (proyecto) console.log(`${n}: sin package-lock.json`);
      continue;
    }
    revisados++;
    try {
      // npm sale con código distinto de 0 si hay vulnerabilidades; `correrNpm` devuelve igual el stdout.
      const r = resumirAudit(JSON.parse(await correrNpm('audit --json', cwd)));
      console.log(`${n}: crítica ${r.critica}, alta ${r.alta}, moderada ${r.moderada}, baja ${r.baja}`);
    } catch (e) {
      console.error(`${n}: no se pudo auditar (${e.message.split('\n')[0]})`);
      process.exitCode = 1;
    }
  }
  if (!revisados && !proyecto) console.log('Ningún proyecto con package-lock.json.');
};
