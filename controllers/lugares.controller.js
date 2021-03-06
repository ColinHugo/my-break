const fs = require( 'fs' );
const path = require( 'path' );

const { Lugar } = require( '../models' );

const { generarUrlFotos, subirFoto, putImagen } = require( '../helpers' );

const getLugares = async ( req, res ) => {

    try {

        let lugares = await Lugar.find();

        if ( lugares.length === 0 ) {

            return res.status( 404 ).json( {
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
            req.body.foto = await subirFoto( req.body.foto, undefined, 'lugares' );
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
    const { foto, usuario, ...datos } = req.body;

    try {

        let lugar = await Lugar.findById( idLugar );

        if ( foto ){
            if ( lugar.foto.length > 6 ){
                const img = await putImagen( lugar, foto, 'lugares' );
                lugar.foto.push( img );
            } else {
                const img = await subirFoto( foto, undefined, 'lugares' );
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

        const lugar = await Lugar.findById( idLugar );

        if ( lugar.foto ) {
            const fotos = lugar.foto;
            
            for ( const foto of fotos ) {

                const pathImagen = path.join( __dirname, '../uploads/', 'lugares', foto );

                if ( fs.existsSync( pathImagen ) ){
                    fs.unlinkSync( pathImagen );
                }
            }
        }

        await lugar.deleteOne();

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

const deleteFotoLugar = async ( req, res ) => {
    
    const { idLugar, nombreFoto } = req.params;

    try {

        const lugar = await Lugar.findById( idLugar );

        if ( lugar.foto.includes( nombreFoto ) ) {

            const pathImagen = path.join( __dirname, '../uploads/lugares', nombreFoto );

            if ( fs.existsSync( pathImagen ) ) {
                fs.unlinkSync( pathImagen );
            }

            await lugar.updateOne( {
                $pull: {
                    foto: nombreFoto
                }
            } );
        }

        else {
            return res.status( 404 ).json( {
                value: 0,
                msg: 'No hay foto que borrar.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La foto se ha eliminado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la foto.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar la foto.'
        } );
    }
};

module.exports = {
    getLugares,
    postLugar,
    putLugar,
    deleteLugar,
    deleteFotoLugar
}