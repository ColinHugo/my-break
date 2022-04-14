const { pathname: __dirname } = new URL( '.', import.meta.url );

import path from 'path';
import fs from 'fs';

import { Comida } from '../models/index.js';

import { generarUrlFotos, archivo } from '../helpers/index.js';

const getComidas = async ( req, res ) => {

    try {

        let comidas = await Comida.find();

        if ( comidas.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay comidas registradas.'
            } );
        }

        comidas = generarUrlFotos( req, 'comidas', comidas );

        return res.status( 200 ).json( {
            value: 1,
            comidas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las comidas.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las comidas.'
        } );
    }
};

const getComida = async ( req, res ) => {

    const { idComida } = req.params;

    try {

        const comida = await Comida.findById( idComida );

        return res.status( 200 ).json( {
            value: 1,
            comida
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la comida.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener la comida.'
        } );
    }
};

const postComida = async ( req, res ) => {

    try {

        if ( req.body.foto ) {
            req.body.foto = await archivo.subirFoto( req.body.foto, undefined, 'comidas' );
        }

        const comida = new Comida( req.body );

        await comida.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La comida se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la comida.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar la comida.'
        } );
    }

};

const putComida = async ( req, res ) => {

    const { idComida } = req.params;
    const { foto, ...datos } = req.body;

    try {

        const comida = await Comida.findById( idComida );

        if ( foto ) {
            if ( comida.foto ) {
    
                const pathImagen = path.join( __dirname, '../uploads/comidas/', comida.foto );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }

            datos.foto = await archivo.subirFoto( foto, undefined, 'comidas' );
        }

        await comida.updateOne( datos );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La comida se ha actualizado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la comida.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar la comida.'
        } );
    }
};

const deleteComida = async ( req, res ) => {

    const { idComida } = req.params;

    try {

        const comida = await Comida.findById( idComida );

        if ( comida.foto ) {
            const pathImagen = path.join( __dirname, '../uploads/comidas/', comida.foto );

            if ( fs.existsSync( pathImagen ) ) {
                fs.unlinkSync( pathImagen );
            }
        }

        await comida.deleteOne();

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La comida se ha eliminado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la comida.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar la comida.'
        } );
    }
};

export {
    getComidas,
    getComida,
    postComida,
    putComida,
    deleteComida
}