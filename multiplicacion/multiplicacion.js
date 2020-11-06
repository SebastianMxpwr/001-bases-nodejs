const fs = require('fs');

let crearArchivo = (base, limite) => {
    return new Promise((resolve, reject) => {
        let tabla='';

        if(!Number(base)){
            reject('Favor de insertar un numero valido');
            return;
        }

        if(!Number(limite)){
            reject('Favor de insertar un limite valido');
            return;
        }

        for(let i=1; i<=limite; i++){
            tabla = tabla + `${base} x ${i} = ${base * i}\n`;
            //console.log(`${base} x ${i} = ${base * i}`); version mas mejor
        }

        fs.writeFile(`Tablas/Tabla-${base}.txt`, tabla, (err)=>{
            if(err) reject(err)
            else
            resolve(`tabla-${base}.txt`);
          });

    });
};

let listarTabla = (base, limite) =>{
    return new Promise((resolve, reject) => {
        
        if(!Number(base)){
            reject('Favor de insertar un numero valido');
            return;
        }

        if(!Number(limite)){
            reject('Favor de insertar un limite valido');
            return;
        }

        for(let i=1; i<=limite; i++){
            console.log(`${base} x ${i} = ${base * i}\n`);
            //console.log(`${base} x ${i} = ${base * i}`); version mas mejor
        }



    });
};

module.exports = { 
crearArchivo, listarTabla
};