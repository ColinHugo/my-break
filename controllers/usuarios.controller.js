const { pathname: __dirname } = new URL( '.', import.meta.url );

import fs from 'fs';
import path from 'path';

import { Usuario } from '../models/index.js';

import { archivo, generarUrlFotos } from '../helpers/index.js';

const getUsuario = async ( req, res ) => {

    const { idUsuario } = req.params;

    try {

        let usuario = await Usuario.findById( idUsuario );

        usuario = generarUrlFotos( req, 'usuarios', usuario );

        return res.status( 200 ).json( {
            value: 1,
            usuario
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener el usuario con id ${ idUsuario }` );

        return res.status( 500 ).json( {
            value: 0,
            msg: `Error al obtener el usuario con id ${ idUsuario }`
        } );
    }
};

const getUsuarios = async ( req, res ) => {

    const query = { estado: true };

    try {

        let usuarios = await Usuario.find( query );

        if ( usuarios.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay usuarios registrados.'
            } );
        }

        usuarios = generarUrlFotos( req, 'usuarios', usuarios );

        return res.status( 200 ).json( {
            value: 1,
            usuarios
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener a los usuarios.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener a los usuarios.'
        } );
    }
};

const postUsuario = async ( req, res ) => {

    try {

        if ( req.body.foto ) {
            req.body.foto = await archivo.subirFoto( req.body.foto, undefined, 'usuarios' );
        }

        const usuario = new Usuario( req.body );

        await usuario.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'El usuario se ha registrado correctamente.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar al usuario.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar al usuario.'
        } );
    }
};

const putUsuario = async ( req, res ) => {

    const { idUsuario } = req.params;
    const { password, foto, ...datos } = req.body;

    try {

        const usuario = await Usuario.findById( idUsuario );

        if ( password ) {
            datos.password = await Usuario.encryptPassword( password );
        }

        if ( foto ) {
            if ( usuario.foto ) {

                const pathImagen = path.join( __dirname, '../uploads/usuarios/', usuario.foto );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }

            datos.foto = await archivo.subirFoto( req.body.foto, undefined, 'usuarios' );
        }

        await usuario.updateOne( datos );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'El usuario se ha actualizado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el usuario.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar el usuario.'
        } );
    }
};

const deleteUsuario = async ( req, res ) => {

    const { idUsuario } = req.params;

    try {

        await Usuario.findByIdAndUpdate( idUsuario, { estado: false } );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'El usuario se ha eliminado correctamente.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar al usuario.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar al usuario.'
        } );
    }
};

export {
    getUsuario,
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}