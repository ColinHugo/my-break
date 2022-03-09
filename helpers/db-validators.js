import * as models from '../models/index.js';

const existeAtraccion = async ( id ) => {
    
    const atraccion = await models.Atraccion.findById( id );
    
    if ( !atraccion ) {
        throw new Error( `No existe atracción con el id ${ id }` );
    }
}

const existeComida = async ( id ) => {
    
    const comida = await models.Comida.findById( id );
    
    if ( !comida ) {
        throw new Error( `No existe comida con el id ${ id }` );
    }
}

const existeEmail = async ( correo ) => {
    
    const email = await models.Usuario.findOne( { correo } );
    
    if ( email ) {
        throw new Error( `El correo: ${ correo }, ya está registrado` );
    }
}

const existeEmergencia = async ( id ) => {
    
    const emergencia = await models.Emergencia.findById( id );
    
    if ( !emergencia ) {
        throw new Error( `No existe contacto de emergencia con el id ${ id }` );
    }
}

const existeLugar = async ( id ) => {
    
    const lugar = await models.Lugar.findById( id );
    
    if ( !lugar ) {
        throw new Error( `No existe lugar con el id ${ id }` );
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
    existeComida,
    existeEmail,
    existeEmergencia,
    existeLugar,
    existeReservacion,
    existeUsuario,
    existeVisita
}