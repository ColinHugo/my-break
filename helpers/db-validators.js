import { Reservacion, Visita } from '../models/index.js';

const existeReservacion = async ( id ) => {
    
    const reservacion = await Reservacion.findById( id );
    
    if ( !reservacion ) {
        throw new Error( `No existe reservación con el id ${ id }` );
    }
}

const existeVisita = async ( id ) => {
    
    const visita = await Visita.findById( id );
    
    if ( !visita ) {
        throw new Error( `No existe visita con el id ${ id }` );
    }
}

export {
    existeReservacion,
    existeVisita
}