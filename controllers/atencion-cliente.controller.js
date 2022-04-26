const fs = require( 'fs' );
const path = require( 'path' );

const { AtencionCliente } = require( '../models' );

const { generarUrlFotos, subirFoto } = require( '../helpers' );

const getMensajes = async ( req, res ) => {

    try {

        let mensajes = await AtencionCliente.find()
            .populate( 'emisor', [ 'nombre', 'apellidos' ] );

        if ( mensajes.length === 0 ) {

            return res.status( 404 ).json( {
                value: 0,
                msg: 'No hay mensajes que mostrar.'
            } );
        }

        mensajes = generarUrlFotos( req, 'atencion', mensajes );

        return res.status( 200 ).json( {
            value: 1,
            mensajes
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los mensajes.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener los mensajes.'
        } );
    }
};

const postMensajes = async ( req, res ) => {

    try {

        if ( req.body.foto ) {
            req.body.foto = await subirFoto( req.body.foto, undefined, 'atencion' );
        }

        req.body.emisor = req.body.usuario;

        const mensaje = new AtencionCliente( req.body );

        await mensaje.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'El mensaje se ha guardado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al guardar el mensaje.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al guardar el mensaje.'
        } );
    }
};

const deleteMensajes = async ( req, res ) => {

    const { idMensaje } = req.params;

    try {

        const atencion = await AtencionCliente.findById( idMensaje );

        if ( atencion.foto ) {
            const pathImagen = path.join( __dirname, '../uploads/', 'atencion', atencion.foto  );

            if ( fs.existsSync( pathImagen ) ){
                fs.unlinkSync( pathImagen );
            }
        }

        await atencion.deleteOne();

        return res.status( 200 ).json( {
            value: 1,
            msg: 'El mensaje se han eliminado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al borrar el mensaje.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al borrar el mensaje.'
        } );
    }
};

module.exports = {
    getMensajes,
    postMensajes,
    deleteMensajes
}