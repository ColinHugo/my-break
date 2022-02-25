import * as models from '../models/index.js';

const existeAtraccion = async ( id ) => {
    
    const atraccion = await models.Atraccion.findById( id );
    
    if ( !atraccion ) {
        throw new Error( `No existe atracción con el id ${ id }` );
    }
}

const existeEmail = async ( correo ) => {
    
    const email = await models.Usuario.findOne( { correo } );
    
    if ( email ) {
        throw new Error( `El correo: ${ correo }, ya está registrado` );
    }
}

const existeReservacion = async ( id ) => {
    
    const reservacion = await models.Reservacion.findById( id );
    
    if ( !reservacion ) {
        throw new Error( `No existe reservación con el id ${ id }` );
    }
}

const existeUsuario = async ( id ) => {

    const usuario = await models.Usuario.findById( id );

    if ( !usuario ) {
        throw new Error( `No existe usuario con el id: ${ id }.` );
    }
}

const existeVisita = async ( id ) => {
    
    const visita = await models.Visita.findById( id );
    
    if ( !visita ) {
        throw new Error( `No existe visita con el id ${ id }` );
    }
}

export {
    existeAtraccion,
    existeEmail,
    existeReservacion,
    existeUsuario,
    existeVisita
}