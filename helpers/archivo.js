const { pathname: __dirname } = new URL( '.', import.meta.url );

import path from 'path';
import fs from 'fs';

import { v4 as uuidv4 } from 'uuid';

const subirFoto = ( dataURI, extensionesValidas = [ 'png', 'jpg', 'jpeg', 'webp' ], carpeta = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const extension = dataURI.split( ';' )[ 0 ].split( '/' )[ 1 ];
        const posicion = dataURI.indexOf( ',' ) + 1;

        const base64Data = dataURI.slice( posicion );
        const binaryData = new Buffer.from( base64Data, 'base64' ).toString( 'binary' );
        
        if ( !extensionesValidas.includes( extension ) ) {
            return reject( `La extensión ${ extension } no es permitida - ${ extensionesValidas }` );
        }

        const nombre = uuidv4() + '.' + extension;
        const carpetaContenedora = path.join( __dirname, '../uploads/', carpeta );

        if ( !fs.existsSync( carpetaContenedora ) ) {
            fs.mkdirSync( carpetaContenedora );
        }

        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombre );

        fs.writeFile( uploadPath, binaryData, 'binary', ( err ) => {

            if( err ){ 
                console.error( 'Error al mover la imagen.', err );
                return reject( 'Error al mover la imagen.' );
            }

            resolve( nombre );
        } );
    } );
};

const putImagen = async ( lugar, dataURI, carpeta ) => {

    try {

        // Hay que borrar la imagen del servidor
        const arrayFotos = lugar.foto;
        const deleted = arrayFotos.shift();

        const pathImagen = path.join( __dirname, '../uploads/', carpeta, deleted );

        if ( fs.existsSync( pathImagen ) ){
            fs.unlinkSync( pathImagen );
        }

        const foto = await subirFoto( dataURI, undefined, 'lugares' ); 

        return foto;
        
    } catch ( error ) {

        console.error( 'Error al borrar la imagen previa.', error );

            return res.json( {
                value: 0,
                msg:  'Error al borrar la imagen previa.'
            } );
    }
};

export {
    subirFoto,
    putImagen
}