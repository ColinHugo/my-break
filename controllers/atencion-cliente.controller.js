import { AtencionCliente, Usuario } from '../models/index.js';

const getMensajes = async ( req, res ) => {

    const { idUsuario } = req.params;

    try {

        const mensajes = await AtencionCliente.where( { receptor: idUsuario } )
            .populate( 'emisor', [ 'nombre', 'apellidos'] )
            .populate( 'receptor', [ 'nombre', 'apellidos'] );

        if ( mensajes.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay mensajes que mostrar.'
            } );
        }

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
    
    const { idReceptor } = req.params;

    try {

        const receptor = await Usuario.findById( idReceptor );

        req.body.emisor = req.body.usuario;
        req.body.receptor = receptor;

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

        await AtencionCliente.findByIdAndDelete( idMensaje )

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

export {
    getMensajes,
    postMensajes,
    deleteMensajes
}