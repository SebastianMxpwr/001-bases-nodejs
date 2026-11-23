// Resume la salida de `npm audit --json` (formato npm 7+).
const resumirAudit = (json) => {
  const v = (json && json.metadata && json.metadata.vulnerabilities) || {};
  return {
    critica: v.critical || 0,
    alta: v.high || 0,
    moderada: v.moderate || 0,
    baja: v.low || 0,
  };
};

module.exports = { resumirAudit };
