const { validationResult } = require( 'express-validator' );

const validarCampos = ( req, res, next ) => {

    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status( 404 ).json( {
            value: 0,
            errors
        } );
    }
    next();
}

module.exports = validarCampos;