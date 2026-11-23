# sb

CLI personal con utilidades para el flujo de trabajo (proyectos de rediseño, conocimiento global, clips). Nació como un ejercicio de Node de 2020 (tablas de multiplicar); el análisis y las opciones están en `_analisis/`.

## Instalación

Requiere Node 20 o superior.

```
npm install
npm link      # lo corres tú: deja disponible el comando `sb` en tu PATH
sb --help
```

Sin `npm link` también sirve: `node bin/sb.js <comando>` o `npm start -- <comando>`.

## Comandos

| Comando | Qué hace | Ejemplo |
|---|---|---|
| `sb proyectos` | Lista las carpetas `NNN-nombre` de la raíz con rama git y si tienen `.docx` en `_analisis/` | `sb proyectos` |
| `sb nuevo <nombre>` | Crea `NNN-slug/_analisis/img/` con el siguiente número | `sb nuevo "Mi Rediseño"` |
| `sb abrir <proyecto>` | Abre el proyecto (número o parte del nombre) en el Explorador; `--editor` usa VS Code | `sb abrir 1 --editor` |
| `sb bandeja` | Lista las notas de `_conocimiento-global/bandeja/` | `sb bandeja` |
| `sb audit [proyecto]` | `npm audit` (solo lectura) de los proyectos con `package-lock.json` | `sb audit 001` |
| `sb clips <carpeta>` | Videos de una carpeta con duración y resolución (requiere `ffprobe`) | `sb clips D:\Clips` |
| `sb tablas -b <n> [-l 10]` | Tabla de multiplicar (recuerdo del proyecto original) | `sb tablas -b 5 -l 3` |

Los errores salen por stderr con código de salida 1.

## SB_RAIZ

La raíz de trabajo es, por defecto, la carpeta dos niveles arriba de este repo (`..\..`). Para usar otra:

```
set SB_RAIZ=D:\otra\raiz         (cmd)
$env:SB_RAIZ = 'D:\otra\raiz'    (PowerShell)
```

## Pruebas

```
npm test
```

## Agregar un comando

Crea `comandos/<nombre>.js` exportando `command`, `describe`, `builder` y `handler`; se registra solo. La lógica pura va en `lib/` con su prueba en `test/`.
