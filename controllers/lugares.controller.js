import { Lugar } from '../models/index.js';

const getLugares = async ( req, res ) => {

    try {

        const lugares = await Lugar.find();

        if ( lugares.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay lugares registradas.'
            } );
        }

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

    try {

        await Lugar.findByIdAndUpdate( idLugar, req.body );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'El lugar se ha actualizado correctamnete.'
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

        await Lugar.findByIdAndDelete( idLugar );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'El lugar se ha eliminado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el lugar.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar lel lugar.'
        } );
    }
};

export {
    getLugares,
    postLugar,
    putLugar,
    deleteLugar
}