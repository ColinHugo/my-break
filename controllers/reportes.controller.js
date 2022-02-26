import { Reporte } from '../models/index.js';

const getReportes = async ( req, res ) => {

    try {

        const reportes = await Reporte.find();

        if ( reportes.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay reportes registrados.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            reportes
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los reportes.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener los reportes.'
        } );
    }
};

const postReporte = async ( req, res ) => {

    try {

        const reporte = new Reporte( req.body );

        await reporte.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'El reporte se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el reporte.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar el reporte.'
        } );
    }

};

export {
    getReportes,
    postReporte
}