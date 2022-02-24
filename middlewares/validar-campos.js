import { validationResult } from 'express-validator';

const validarCampos = ( req, res, next ) => {

    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.json( {
            value: 0,
            errors
        } );
    }
    next();
}

export default validarCampos;