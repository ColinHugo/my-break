import { Visita } from '../models/index.js';

const existeVisita = async ( id ) => {
    
    const visita = await Visita.findById( id );
    
    if ( !visita ) {
        throw new Error( `No existe visita con el id ${ id }` );
    }
}

export {
    existeVisita
}