# 📚 Tablas de multiplicar: versión didáctica

CLI pequeña para aprender yargs, Node.js y JavaScript modernos. Genera tablas de multiplicar, las imprime, las guarda y las lee.

![Node](https://img.shields.io/badge/node-%3E%3D20.19-339933?logo=node.js&logoColor=white)
![yargs](https://img.shields.io/badge/yargs-18-blue)
![ESM](https://img.shields.io/badge/m%C3%B3dulos-ESM-f7df1e)
![Licencia](https://img.shields.io/badge/licencia-ISC-lightgrey)

## Dos ramas, dos propósitos

| Rama | Para qué sirve |
|---|---|
| [`master`](../../tree/master) | Herramienta para nuestro flujo de trabajo (*Rediseños de Apps viejas*): el CLI `sb`. |
| `aprendizaje` (esta) | Versión didáctica para aprender yargs, Node y JavaScript moderno. |

Nació en 2020 como ejercicio con yargs 16; esta rama es ese ejercicio modernizado.

## Requisitos

- Node.js `^20.19.0 || ^22.12.0 || >=23` (lo exige yargs 18; probado con v24).
- `npm install`

## Cómo correr

```
npm start -- lista -b 5          # imprime la tabla del 5
npm start -- crear -b 7 -l 12 -f csv
npm start -- --help              # ver todos los comandos
npm run dev -- lista -b 5        # se reinicia al guardar cambios (node --watch)
npm test                         # pruebas con node:test
```

`npm run dev` reemplaza a `nodemon`, que mencionaba la versión de 2020: `node --watch` ya viene en Node.

## Comando → concepto que enseña

| Comando | Concepto |
|---|---|
| `lista -b -l` | Módulo de comando de yargs, opciones, alias, defaults y `type: 'number'` |
| `crear -b -l -f -s` | `choices`, async/await, `fs/promises` (`mkdir` recursivo, `writeFile`), rutas absolutas |
| `leer -b -f` | `readFile`, `try/catch` con await, error `ENOENT` |
| `archivos` | `readdir` + `stat` en paralelo con `Promise.all` |
| `preguntar` | `node:readline/promises`, entrada interactiva sin librerías |

La lógica pura vive en `lib/tabla.js` (y se prueba en `test/`); los comandos solo conectan yargs con ella.

## Retos

1. Agrega el formato `md` (tabla markdown) en `formatear` y en los `choices`, con su prueba.
2. Crea un comando `borrar -b` que elimine `Tabla-<base>.*` con `rm` de `fs/promises` y avise si no existe.
3. Agrega una opción `--desde` (por defecto 1) a `lista` y `crear` para empezar la tabla en otro número.
4. Haz que `archivos` ordene por fecha y acepte `--orden nombre|fecha`.
5. Haz que `preguntar` repita la pregunta si el valor no es válido en vez de terminar con error.

## Qué cambió respecto a 2020

- Promesas con `.then` / `.catch` → `async` / `await` con `try/catch`.
- CommonJS (`require`) → módulos ESM (`import`, `"type": "module"`).
- yargs 16 → 18, con comandos como módulos y `.strict()`.
- `nodemon` → `node --watch` (ya viene en Node).
- Validación `!Number` → `Number.isInteger` (ahora el 0 es válido y los decimales no).
- Ruta relativa al cwd → ruta absoluta con `import.meta.dirname`.
