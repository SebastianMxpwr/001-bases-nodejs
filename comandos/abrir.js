const path = require('path');
const { spawn } = require('child_process');
const { raiz } = require('../lib/config');
const { resolverProyecto } = require('../lib/proyectos');

exports.command = 'abrir <proyecto>';
exports.describe = 'Abre un proyecto (número o parte del nombre) en el Explorador, o con --editor en VS Code';
exports.builder = (y) =>
  y.positional('proyecto', { type: 'string' }).option('editor', { alias: 'e', type: 'boolean', describe: 'Abrir en VS Code' });
exports.handler = async ({ proyecto, editor }) => {
  const dir = path.join(raiz, resolverProyecto(proyecto));
  // code es un .cmd: necesita shell y la ruta entre comillas (tiene espacios y ñ).
  const hijo = editor
    ? spawn(`code "${dir}"`, { shell: true, detached: true, stdio: 'ignore' })
    : spawn('explorer.exe', [dir], { detached: true, stdio: 'ignore' });
  hijo.on('error', (e) => {
    console.error(`Error: ${e.message}`);
    process.exitCode = 1;
  });
  hijo.unref();
  console.log(dir);
};
