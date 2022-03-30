const { pathname: __dirname } = new URL( '.', import.meta.url );

import { Lugar } from '../models/index.js';

import { generarUrlFotos, archivo } from '../helpers/index.js';

const getLugares = async ( req, res ) => {

    try {

        let lugares = await Lugar.find();

        if ( lugares.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay lugares registradas.'
            } );
        }

        lugares = generarUrlFotos( req, 'lugares', lugares );

        return res.status( 200 ).json( {
            value: 1,
            lugares
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los lugares.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener los lugares.'
        } );
    }
};

const postLugar = async ( req, res ) => {

    try {

        if ( req.body.foto ) {
            req.body.foto = await archivo.subirFoto( req.body.foto, undefined, 'lugares' );
        }

        const lugar = new Lugar( req.body );

        await lugar.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'El lugar se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el lugar.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar el lugar.'
        } );
    }

};

const putLugar = async ( req, res ) => {

    const { idLugar } = req.params;
    const { foto, ...datos } = req.body;

    try {

        let lugar = await Lugar.findById( idLugar );

        if ( foto ) {
            if ( lugar.foto.length > 6 ){
                const img = await archivo.putImagen( lugar, foto, 'lugares' );
                lugar.foto.push( img );
            } else {
                const img = await archivo.subirFoto( foto, undefined, 'lugares' );
                lugar.foto.push( img );
            }
            await lugar.save();
        }

        await lugar.updateOne( datos );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'El lugar se ha actualizado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el lugar.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar el lugar.'
        } );
    }
};

const deleteLugar = async ( req, res ) => {

    const { idLugar } = req.params;

    try {

        await Lugar.findByIdAndDelete( idLugar );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'El lugar se ha eliminado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el lugar.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar el lugar.'
        } );
    }
};

export {
    getLugares,
    postLugar,
    putLugar,
    deleteLugar
}