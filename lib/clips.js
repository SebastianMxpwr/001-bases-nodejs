const EXT_VIDEO = /\.(mp4|mov|mkv|avi)$/i;

const formatoDuracion = (seg) => {
  const t = Math.round(Number(seg) || 0);
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
};

// Parsea el JSON de ffprobe -show_entries format=duration:stream=width,height
const parseFfprobe = (texto) => {
  const j = JSON.parse(texto);
  const s = (j.streams || []).find((x) => x.width && x.height);
  return {
    duracion: Number(j.format && j.format.duration) || 0,
    resolucion: s ? `${s.width}x${s.height}` : '-',
  };
};

module.exports = { EXT_VIDEO, formatoDuracion, parseFfprobe };
