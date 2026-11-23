import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validar, generarTabla, formatear } from '../lib/tabla.js';

test('validar acepta 0 como base', () => {
  assert.doesNotThrow(() => validar(0, 10));
});

test('validar acepta bases negativas', () => {
  assert.doesNotThrow(() => validar(-3, 5));
});

test('validar rechaza decimales', () => {
  assert.throws(() => validar(2.5, 10), /base/);
  assert.throws(() => validar(2, 1.5), /límite/);
});

test('validar rechaza límites fuera de rango', () => {
  assert.throws(() => validar(2, 0), /límite/);
  assert.throws(() => validar(2, -1), /límite/);
  assert.throws(() => validar(2, 1001), /límite/);
  assert.doesNotThrow(() => validar(2, 1000));
});

test('validar rechaza NaN', () => {
  assert.throws(() => validar(NaN, 10), /base/);
});

test('generarTabla devuelve filas', () => {
  assert.deepEqual(generarTabla(5, 2), [
    { base: 5, i: 1, resultado: 5 },
    { base: 5, i: 2, resultado: 10 },
  ]);
  assert.equal(generarTabla(0, 3).every((f) => f.resultado === 0), true);
});

test('formatear txt, json y csv', () => {
  const filas = generarTabla(5, 2);
  assert.equal(formatear(filas, 'txt'), '5 x 1 = 5\n5 x 2 = 10');
  assert.deepEqual(JSON.parse(formatear(filas, 'json')), filas);
  assert.equal(formatear(filas, 'csv'), 'base,i,resultado\n5,1,5\n5,2,10');
  assert.throws(() => formatear(filas, 'xml'), /Formato/);
});
