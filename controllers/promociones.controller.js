import { Promocion } from '../models/index.js';

const getPromociones = async ( req, res ) => {

    try {

        const promociones = await Promocion.find();

        if ( promociones.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay promociones registradas.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            promociones
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las promociones.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las promociones.'
        } );
    }
};

const postPromocion = async ( req, res ) => {

    try {

        const promocion = new Promocion( req.body );

        await promocion.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La promoción se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la promoción.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar la promoción.'
        } );
    }

};

const putPromocion = async ( req, res ) => {

    const { idPromocion } = req.params;

    try {

        await Promocion.findByIdAndUpdate( idPromocion, req.body );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La promoción se ha actualizado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la promoción.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar la promoción.'
        } );
    }
};

const deletePromocion = async ( req, res ) => {

    const { idPromocion } = req.params;

    try {

        await Promocion.findByIdAndDelete( idPromocion );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La promoción se ha eliminado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la promoción.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar la promoción.'
        } );
    }
};

export {
    getPromociones,
    postPromocion,
    putPromocion,
    deletePromocion
}