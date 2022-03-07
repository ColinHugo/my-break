import { Usuario } from '../models/index.js';

import { generarJWT } from '../helpers/index.js';

const iniciarSesion = async ( req, res ) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne( { correo } );
    
        const passwordCorrect = ( usuario === null || !usuario.estado ) ? 
        false : await usuario.comprobarPassword( password, usuario.password );
    
        if ( !passwordCorrect ) {
            return res.json( {
                value: 0,
                msg: 'Usuario o Password incorrectos',
            } );
        }
    
        const token = await generarJWT( usuario.id );
    
        return res.json( {
            value: 1,
            usuario,
            token
        } );

    } catch ( error ) {

        console.error( 'Error al inicar sesión', error );

        return res.json( {
            value: 0,
            msg: 'Error al inicar sesión',
        } );
    }
};

export {
    iniciarSesion
}