const generarTabla = (base, limite = 10) => {
  if (!Number.isInteger(base)) throw new Error('La base debe ser un entero.');
  if (!Number.isInteger(limite) || limite < 1 || limite > 1000) {
    throw new Error('El límite debe ser un entero entre 1 y 1000.');
  }
  return Array.from({ length: limite }, (_, i) => `${base} x ${i + 1} = ${base * (i + 1)}`);
};

module.exports = { generarTabla };
