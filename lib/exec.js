const { execFile, exec } = require('child_process');

const resolver = (resolve, reject) => (err, stdout) => {
  // npm audit sale con código distinto de 0 si hay vulnerabilidades: devolvemos igual el stdout.
  if (err && !stdout) reject(err);
  else resolve(stdout);
};
const opts = { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 };

// Ejecutable real (ffprobe, git), sin shell.
const correr = (cmd, args, extra = {}) =>
  new Promise((res, rej) => execFile(cmd, args, { ...opts, ...extra }, resolver(res, rej)));

// npm es un .cmd en Windows: sin shell da EINVAL. Se pasa como cadena fija (sin datos del usuario).
const correrNpm = (comando, cwd) =>
  new Promise((res, rej) => exec(`npm ${comando}`, { ...opts, cwd }, resolver(res, rej)));

module.exports = { correr, correrNpm };
