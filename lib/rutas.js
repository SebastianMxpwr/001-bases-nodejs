import path from 'node:path';

// import.meta.dirname es la carpeta de ESTE archivo (en CommonJS era __dirname).
// Así la ruta no depende de desde dónde ejecutes el comando.
const raiz = path.resolve(import.meta.dirname, '..');

export function carpetaSalida(salida) {
  return salida ? path.resolve(salida) : path.join(raiz, 'Tablas');
}

export function rutaTabla(base, formato, salida) {
  return path.join(carpetaSalida(salida), `Tabla-${base}.${formato}`);
}
