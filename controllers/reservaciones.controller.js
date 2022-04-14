import { Reservacion, Lugar } from '../models/index.js';

const getReservaciones = async ( req, res ) => {

    try {

        const reservaciones = await Reservacion.find()
            .populate( 'lugar', [ 'nombre', 'ubicacion' ] );

        if ( reservaciones.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay reservaciónes registradas.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            reservaciones
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las reservaciones.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener la reservaciones.'
        } );
    }
};

const getReservacion = async ( req, res ) => {

    const { idReservacion } = req.params;

    try {

        const reservacion = await Reservacion.findById( idReservacion )
            .populate( 'lugar', [ 'nombre', 'ubicacion' ] );

        if ( reservacion.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay reservación registrada.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            reservacion
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la reservación.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener la reservación.'
        } );
    }
};

const postReservacion = async ( req, res ) => {

    const { idLugar } = req.params;

    try {

        const lugar = await Lugar.findById( idLugar );
        req.body.lugar = lugar;

        const reservacion = new Reservacion( req.body );

        await reservacion.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La reservación se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la reservación.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar la reservación.'
        } );
    }
};

const putReservacion = async ( req, res ) => {

    const { idReservacion } = req.params;

    try {

        await Reservacion.findByIdAndUpdate( idReservacion, req.body );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La reservación se ha actualizado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la reservación.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar la reservación.'
        } );
    }
};

const deleteReservacion = async ( req, res ) => {

    const { idReservacion } = req.params;

    try {

        await Reservacion.findByIdAndDelete( idReservacion );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La reservación se ha eliminado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la reservación.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar la reservación.'
        } );
    }
};

export {
    getReservaciones,
    getReservacion,
    postReservacion,
    putReservacion,
    deleteReservacion
}