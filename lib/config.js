const path = require('path');

// Raíz de trabajo: carpeta que contiene los proyectos NNN-nombre/
const raiz = process.env.SB_RAIZ || path.resolve(__dirname, '..', '..');

module.exports = { raiz };
