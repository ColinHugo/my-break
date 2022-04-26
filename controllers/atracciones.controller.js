const path = require( 'path' );
const fs = require( 'fs' );

const { Atraccion } = require( '../models' );

const { subirFoto, generarUrlFotos } = require( '../helpers' );

const getAtracciones = async ( req, res ) => {

    try {

        let atracciones = await Atraccion.find();

        if ( atracciones.length === 0 ) {

            return res.status( 404 ).json( {
                value: 0,
                msg: 'No hay atracciones registradas.'
            } );
        }

        atracciones = generarUrlFotos( req, 'atracciones', atracciones );

        return res.status( 200 ).json( {
            value: 1,
            atracciones
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las atracciones.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las atracciones.'
        } );
    }
};

const postAtraccion = async ( req, res ) => {

    try {

        if ( req.body.foto ) {
            req.body.foto = await subirFoto( req.body.foto, undefined, 'atracciones' );
        }

        const atraccion = new Atraccion( req.body );

        await atraccion.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La atraccion se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la atracción.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar la atracción.'
        } );
    }

};

const putAtraccion = async ( req, res ) => {

    const { idAtraccion } = req.params;

    try {

        const atraccion = await Atraccion.findById( idAtraccion );

        if ( req.body.foto ) {

            if ( atraccion.foto ) {
    
                const pathImagen = path.join( __dirname, '../uploads/atracciones/', atraccion.foto );
    
                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }
            
            req.body.foto = await subirFoto( req.body.foto, undefined, 'atracciones' );
        }

        await atraccion.updateOne( req.body );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La atracción se ha actualizado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la atracción.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar la atracción.'
        } );
    }
};

const deleteAtraccion = async ( req, res ) => {

    const { idAtraccion } = req.params;

    try {

        const atraccion = await Atraccion.findById( idAtraccion );

        if ( atraccion.foto ) {

            const pathImagen = path.join( __dirname, '../uploads/atracciones/', atraccion.foto );

            if ( fs.existsSync( pathImagen ) ){
                fs.unlinkSync( pathImagen );
            }
        }

        await atraccion.deleteOne();

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La atracción se ha eliminado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la atracción.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar la atracción.'
        } );
    }
};

module.exports = {
    getAtracciones,
    postAtraccion,
    putAtraccion,
    deleteAtraccion
}