const { pathname: __dirname } = new URL( '.', import.meta.url );

import path from 'path';
import fs from 'fs';

import { Promocion } from '../models/index.js';

import { archivo, generarUrlFotos } from '../helpers/index.js';

const getPromociones = async ( req, res ) => {

    try {

        let promociones = await Promocion.find();

        if ( promociones.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay promociones registradas.'
            } );
        }

        promociones = generarUrlFotos( req, 'promociones', promociones );

        return res.status( 200 ).json( {
            value: 1,
            promociones
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las promociones.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las promociones.'
        } );
    }
};

const postPromocion = async ( req, res ) => {

    try {

        if ( req.body.foto ) {
            req.body.foto = await archivo.subirFoto( req.body.foto, undefined, 'promociones' );
        }

        const promocion = new Promocion( req.body );

        await promocion.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La promoción se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la promoción.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar la promoción.'
        } );
    }

};

const putPromocion = async ( req, res ) => {

    const { idPromocion } = req.params;
    const { foto, ...datos } = req.body;

    try {

        let promocion = await Promocion.findById( idPromocion );

        if ( foto ) {
            if ( promocion.foto.length > 2 ){
                const img = await archivo.putImagen( promocion, foto, 'promociones' );
                promocion.foto.push( img );
            } else {
                const img = await archivo.subirFoto( foto, undefined, 'promociones' );
                promocion.foto.push( img );
            }
            await promocion.save();
        }

        await promocion.updateOne( datos );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La promoción se ha actualizado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la promoción.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar la promoción.'
        } );
    }
};

const deletePromocion = async ( req, res ) => {

    const { idPromocion } = req.params;

    try {

        const promocion = await Promocion.findById( idPromocion );

        if ( promocion.foto ) {
            const fotos = promocion.foto;
            
            for ( const foto of fotos ) {

                const pathImagen = path.join( __dirname, '../uploads/', 'promociones', foto );

                if ( fs.existsSync( pathImagen ) ){
                    fs.unlinkSync( pathImagen );
                }
            }
        }

        await promocion.deleteOne();

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La promoción se ha eliminado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la promoción.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar la promoción.'
        } );
    }
};

export {
    getPromociones,
    postPromocion,
    putPromocion,
    deletePromocion
}