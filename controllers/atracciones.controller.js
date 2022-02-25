import { Atraccion } from '../models/index.js';

const getAtracciones = async ( req, res ) => {

    try {

        const atracciones = await Atraccion.find();

        if ( atracciones.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay atracciones registradas.'
            } );
        }

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

        await Atraccion.findByIdAndUpdate( idAtraccion, req.body );

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

        await Atraccion.findByIdAndDelete( idAtraccion );

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

export {
    getAtracciones,
    postAtraccion,
    putAtraccion,
    deleteAtraccion
}