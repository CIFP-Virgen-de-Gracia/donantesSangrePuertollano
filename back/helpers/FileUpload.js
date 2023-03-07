const path = require('path');
const { v4: uuidv4 } = require('uuid');  //Este paquete nos permitirá crear un archivo con nombre único.
//Todo Isa
const subirArchivo = ( files, extensionesValidas = ['PNG',"JPG",'png','jpg','jpeg','gif','tiff','svg','webp'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        // Validar la extension
        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${extensionesValidas}`);
        }
        
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nombreTemp );
            return nombreTemp;
        });

    });

}

module.exports = {
  subirArchivo
};