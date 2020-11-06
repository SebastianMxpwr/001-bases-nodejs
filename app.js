const argv = require('yargs')
    .command('lista', 'imprime en la pantalla la tabla de multiplicar', {
        base: {
            demand: true,
            alias: 'b'
        },
        limite: {
            alias: 'l',
            default: 10
        }
     })
     .command('crear', 'crea un archivo con la tabla de multiplicar', {
        base: {
            demand: true,
            alias: 'b'
        },
        limite: {
            alias: 'l',
            default: 10
        }
     })
     .help()
    .argv;

const { alias } = require('yargs');
const multiplicar = require('./multiplicacion/multiplicacion');

let comando = argv._[0];

let base = argv.base;
let limite = argv.limite; 

switch( comando ){
    case 'lista':
        multiplicar
        .listarTabla(base, limite)
        .then()
        .catch(error => console.log(`Ocurrio un error ${error}` ));
    break;
      
    case 'crear':
        multiplicar
          .crearArchivo(base, limite)
          .then(archivo => console.log(`El archivo ${archivo} se creo, puta barata` ))
          .catch(error => console.log(`Ocurrio un error ${error}` ));  
    break;
    default:
        console.log('comando no reconocido');

}

 
