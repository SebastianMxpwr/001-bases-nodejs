const fs = require('fs');
const path = require('path');
const { EXT_VIDEO, formatoDuracion, parseFfprobe } = require('../lib/clips');
const { correr } = require('../lib/exec');

exports.command = 'clips <carpeta>';
exports.describe = 'Lista los videos de una carpeta con duración y resolución (solo lectura)';
exports.builder = (y) => y.positional('carpeta', { type: 'string' });
exports.handler = async ({ carpeta }) => {
  const dir = path.resolve(carpeta);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) throw new Error(`No es una carpeta: ${dir}`);
  const videos = fs.readdirSync(dir).filter((f) => EXT_VIDEO.test(f)).sort();
  if (!videos.length) return console.log('No hay videos.');
  const args = ['-v', 'error', '-show_entries', 'format=duration:stream=width,height', '-of', 'json'];
  let total = 0;
  const filas = [];
  for (const f of videos) {
    let info;
    try {
      info = parseFfprobe(await correr('ffprobe', [...args, path.join(dir, f)]));
    } catch (e) {
      if (e.code === 'ENOENT') throw new Error('No se encontró ffprobe en el PATH. Instala ffmpeg.');
      throw new Error(`ffprobe falló con ${f}: ${e.message.split('\n')[0]}`);
    }
    total += info.duracion;
    filas.push([f, formatoDuracion(info.duracion), info.resolucion]);
  }
  const ancho = Math.max(...filas.map((f) => f[0].length));
  for (const [f, d, r] of filas) console.log(`${f.padEnd(ancho)}  ${d}  ${r}`);
  console.log(`\nTotal: ${filas.length} videos, ${formatoDuracion(total)}`);
};
