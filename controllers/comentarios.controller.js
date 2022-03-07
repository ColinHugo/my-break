import { Comentario } from '../models/index.js';

const getComentarios = async ( req, res ) => {

    try {

        const comentarios = await Comentario.find();

        if ( comentarios.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay comentarios registrados.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            comentarios
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los comentarios.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener los comentarios.'
        } );
    }
};

const postComentario = async ( req, res ) => {

    try {

        const comentario = new Comentario( req.body );

        await comentario.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'El comentario se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el comentario.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar el comentario.'
        } );
    }
};

export {
    getComentarios,
    postComentario
}