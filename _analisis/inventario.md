# Inventario de 001-bases-nodejs (solo lectura)

## 1. Archivos del proyecto (sin .git/ ni node_modules/)

| Ruta | Bytes |
|------|-------|
| ./.gitignore | 15 |
| ./app.js | 1255 |
| ./info.md | 89 |
| ./package-lock.json | 5090 |
| ./package.json | 350 |
| ./Tablas/Tabla-10.txt | 52 |
| ./Tablas/Tabla-100.txt | 152 |
| ./Tablas/Tabla-1000.txt | 172 |
| ./Tablas/Tabla-2.txt | 152 |
| ./Tablas/Tabla-700.txt | 160 |
| ./multiplicacion/multiplicacion.js | 1368 |

## 2. package.json

- name: `001-bases-node`
- version: `1.0.0`
- description: `Es pa puros pros`
- main: `app.js`
- author: `Madrid Martinez Sebastian`
- license: `ISC`
- keywords: `Progamer`

Scripts:

| script | comando |
|--------|---------|
| test | `echo "Error: no test specified" && exit 1` |

Dependencies:

| paquete | rango declarado |
|---------|-----------------|
| yargs | ^16.0.3 |

devDependencies: no existe en el archivo.

## 3. package-lock.json

- lockfileVersion: 1

| paquete | versión |
|---------|---------|
| ansi-regex | 5.0.0 |
| ansi-styles | 4.3.0 |
| cliui | 7.0.1 |
| color-convert | 2.0.1 |
| color-name | 1.1.4 |
| emoji-regex | 8.0.0 |
| escalade | 3.1.0 |
| get-caller-file | 2.0.5 |
| is-fullwidth-code-point | 3.0.0 |
| require-directory | 2.1.1 |
| string-width | 4.2.0 |
| strip-ansi | 6.0.0 |
| wrap-ansi | 7.0.0 |
| y18n | 5.0.2 |
| yargs | 16.0.3 |
| yargs-parser | 20.2.1 |

## 4. node_modules/ (primer nivel)

Todas las versiones instaladas coinciden con el lock. No hay marcas "NO COINCIDE".

| paquete | versión instalada | engines |
|---------|-------------------|---------|
| ansi-regex | 5.0.0 | node >=8 |
| ansi-styles | 4.3.0 | node >=8 |
| cliui | 7.0.1 | (sin engines) |
| color-convert | 2.0.1 | node >=7.0.0 |
| color-name | 1.1.4 | (sin engines) |
| emoji-regex | 8.0.0 | (sin engines) |
| escalade | 3.1.0 | node >=6 |
| get-caller-file | 2.0.5 | node 6.* \|\| 8.* \|\| >= 10.* |
| is-fullwidth-code-point | 3.0.0 | node >=8 |
| require-directory | 2.1.1 | node >=0.10.0 |
| string-width | 4.2.0 | node >=8 |
| strip-ansi | 6.0.0 | node >=8 |
| wrap-ansi | 7.0.0 | node >=10 |
| y18n | 5.0.2 | node >=10 |
| yargs-parser | 20.2.1 | node >=10 |
| yargs | 16.0.3 | node >=10 |

## 5. Carpeta Tablas/

| archivo | líneas (wc -l) | primera línea | última línea |
|---------|----------------|---------------|--------------|
| Tabla-10.txt | 4 | `10 x 1 = 10` | `10 x 4 = 40` |
| Tabla-100.txt | 10 | `100 x 1 = 100` | `100 x 10 = 1000` |
| Tabla-1000.txt | 10 | `1000 x 1 = 1000` | `1000 x 10 = 10000` |
| Tabla-2.txt | 10 | `100 x 1 = 100` | `100 x 10 = 1000` |
| Tabla-700.txt | 10 | `700 x 1 = 700` | `700 x 10 = 7000` |

## 6. Carpeta multiplicacion/

Archivos:

| archivo | líneas |
|---------|--------|
| multiplicacion.js | 55 |

Nombres exportados por `module.exports` (tal cual):

```
crearArchivo, listarTabla
```

## 7. Git

- Rama actual: `master`
- Total de commits (`git rev-list --count HEAD`): 4
- Remotos (`git remote -v`):
  ```
  origin	https://github.com/SebastianMxpwr/001-bases-nodejs.git (fetch)
  origin	https://github.com/SebastianMxpwr/001-bases-nodejs.git (push)
  ```

Log (`git log --format='%h | %ad | %an | %s' --date=short`, son 4 commits, menos de 50, se listan todos):

```
55a55f1 | 2020-11-09 | Sebastian | corergimos el acrvhivo .gitignore
fca845a | 2020-11-09 | Sebastian | agregamos el acrvhivo .gitignore
99f79bf | 2020-11-07 | Sebastián | Se agrego infromacion del proyecto
1a8aef2 | 2020-11-06 | Sebastián | Primer commit del proyecto jalando
```

Archivos tocados por commit (`git show --stat`):

| commit | archivos tocados |
|--------|------------------|
| 55a55f1 | .gitignore (1 eliminación) |
| fca845a | .gitignore (2 inserciones) |
| 99f79bf | info.md (5 inserciones) |
| 1a8aef2 | Tablas/Tabla-10.txt, Tablas/Tabla-100.txt, Tablas/Tabla-1000.txt, Tablas/Tabla-2.txt, Tablas/Tabla-700.txt, app.js, multiplicacion/multiplicacion.js, package.json, package-lock.json, y 154 archivos bajo node_modules/ (163 archivos en total, 17171 inserciones) |

`git status --short` (medido antes de crear `_analisis/`): salida vacía, árbol limpio.

## 8. Archivos de configuración e información

.gitignore:

```
node_modules/
```

info.md:

```
## instrucciones

-Instalar node
-Programar el codigo
-Correr el proyecto con nodemon
```

## Notas (cosas raras)

- `node_modules/` está versionado en git (commit 1a8aef2), aunque `.gitignore` lo excluye. Git ignora solo lo no rastreado, así que los cambios en node_modules sí aparecerían en `git status`.
- `Tablas/Tabla-2.txt` contiene la tabla del 100 (`100 x 1 = 100` ... `100 x 10 = 1000`), no la del 2. Probablemente se generó con la base equivocada.
- `Tablas/Tabla-10.txt` tiene 4 líneas; las demás tienen 10. Los archivos usan finales de línea CRLF (verificado en Tabla-10 y Tabla-2).
- `multiplicacion/multiplicacion.js`: `listarTabla` nunca llama `resolve()`, así que su promesa no se resuelve nunca en el caso de éxito. `crearArchivo` resuelve con `tabla-<base>.txt` en minúscula, mientras el archivo real se llama `Tabla-<base>.txt`. La ruta de escritura `Tablas/...` es relativa al directorio de trabajo.
- `package.json` no declara `engines` ni `devDependencies`. El script `test` es el placeholder por defecto de npm.
- `package-lock.json` usa `lockfileVersion` 1 (npm antiguo). No tiene dependencias anidadas.
- `app.js` no fue leído: no estaba en los pasos de la tarea.
