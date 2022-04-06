import { Emergencia } from '../models/index.js';

const getEmergencias = async ( req, res ) => {

    try {

        const emergencias = await Emergencia.find();

        if ( emergencias.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay contactos de emergencias registrados.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            emergencias
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los contactos de emergencias.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener los contactos de emergencias.'
        } );
    }
};

const postEmergencia = async ( req, res ) => {

    try {

        const emergencia = new Emergencia( req.body );

        await emergencia.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'El contacto de emergencia se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el contacto de emergencia.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar el contacto de emergencia.'
        } );
    }
};

const putEmergencia = async ( req, res ) => {

    const { idEmergencia } = req.params;

    try {

        await Emergencia.findByIdAndUpdate( idEmergencia, req.body );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'El contacto de emergencia se ha actualizado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el contacto de emergencia.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar el contacto de emergencia.'
        } );
    }
};

const deleteEmergencia = async ( req, res ) => {

    const { idEmergencia } = req.params;

    try {

        await Emergencia.findByIdAndDelete( idEmergencia );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'El contacto de emergencia se ha eliminado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el contacto de emergencia.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar el contacto de emergencia.'
        } );
    }
};

export {
    getEmergencias,
    postEmergencia,
    putEmergencia,
    deleteEmergencia
}