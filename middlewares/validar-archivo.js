const validarArchivo = ( req, res, next ) => {
    
    if( !req.files || Object.keys( req.files ).length === 0 || !req.files.archivo  ) {

        return res.status( 400 ).json( {
            value: 0,
            msg: 'El archivo es obligatorio.'
        } );
    }

    if( req.files.archivo.length > 1  ) {

        return res.status( 400 ).json( {
            value: 0,
            msg: 'Sólo puedes subir un archivo a la vez.'
        } );
    }

    next();
}

module.exports = validarArchivo;