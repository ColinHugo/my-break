import { Usuario } from '../models/index.js';

const getUsuario = async ( req, res ) => {

    const { id } = req.params;

    try {

        const usuario = await Usuario.findById( id );

        return res.status( 200 ).json( {
            value: 1,
            usuario
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener el usuario con id ${ id }` );

        return res.status( 500 ).json( {
            value: 0,
            msg: `Error al obtener el usuario con id ${ id }`
        } );
    }
};

const getUsuarios = async ( req, res ) => {

    const query = { estado: true };

    try {

        const usuarios = await Usuario.find( query );

        if ( usuarios.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay usuarios registrados.'
            } );
        }

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

// TODO: realizar endpoint para restablecer password
const putUsuario = async ( req, res ) => {

    const { id } = req.params;
    const { password, ...datos } = req.body;

    try {

        if ( password ) {

            const usuario = await Usuario.findOne( { id } );
            usuario.password = password;

            await usuario.save();
        }

        await Usuario.findByIdAndUpdate( id, datos );

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

    const { id } = req.params;

    try {

        await Usuario.findByIdAndUpdate( id, { estado: false } );

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