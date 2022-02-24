import { Visita } from '../models/index.js';

const getVisitas = async ( req, res ) => {

    try {

        const visitas = await Visita.find();

        if ( visitas.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay visitas registradas.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            visitas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener a las visitas.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener a las visitas.'
        } );
    }
};

const postVisita = async ( req, res ) => {

    try {

        const visita = new Visita( req.body );

        await visita.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La visita se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la visita.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar la visita.'
        } );
    }

};

const putVisita = async ( req, res ) => {

    const { idVisita } = req.params;

    try {

        await Visita.findByIdAndUpdate( idVisita, req.body );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La visita se ha actualizado correctamnete.'
        } )
        
    } catch ( error ) {

        console.error( 'Error al actualizar la visita.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar la visita.'
        } );
    }
};

const deleteVisita = async ( req, res ) => {

    const { idVisita } = req.params;

    try {

        await Visita.findByIdAndDelete( idVisita );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La visita se ha eliminado correctamnete.'
        } )
        
    } catch ( error ) {

        console.error( 'Error al eliminar la visita.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar la visita.'
        } );
    }
};

export {
    getVisitas,
    postVisita,
    putVisita,
    deleteVisita
}