// Funciones puras: no leen ni escriben nada, por eso son fáciles de probar.

export function validar(base, limite) {
  if (!Number.isInteger(base)) {
    throw new Error(`La base debe ser un número entero (recibí: ${base})`);
  }
  if (!Number.isInteger(limite) || limite < 1 || limite > 1000) {
    throw new Error(`El límite debe ser un entero entre 1 y 1000 (recibí: ${limite})`);
  }
}

export function generarTabla(base, limite) {
  validar(base, limite);
  return Array.from({ length: limite }, (_, k) => {
    const i = k + 1;
    return { base, i, resultado: base * i };
  });
}

export function formatear(filas, formato = 'txt') {
  switch (formato) {
    case 'txt':
      return filas.map(({ base, i, resultado }) => `${base} x ${i} = ${resultado}`).join('\n');
    case 'json':
      return JSON.stringify(filas, null, 2);
    case 'csv':
      return ['base,i,resultado', ...filas.map(({ base, i, resultado }) => `${base},${i},${resultado}`)].join('\n');
    default:
      throw new Error(`Formato desconocido: ${formato} (usa txt, json o csv)`);
  }
}
