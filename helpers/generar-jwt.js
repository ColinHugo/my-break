import jwt from 'jsonwebtoken'

const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.JWT_SECRET, ( err, token ) => {

            if( err ){
                console.error( err );
                reject( 'No se pudo generar el JWT' );
            }

            else{
                resolve( token );
            }
        } );
    } );
};

export default generarJWT;