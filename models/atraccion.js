const { Schema, model } = require( 'mongoose' );

const atraccionSchema = Schema( {

    tipo: {
        type: String,        
        trim: true
    },

    descripcion: {
        type: String,
        trim: true
    },

    ubicacion: {
        type: String,
        trim: true
    },

    contacto: {
        type: String,
        trim: true
    },

    foto: {
        type: String,
        trim: true
    },

}, {
    versionKey: false
} );

atraccionSchema.methods.toJSON = function(){

    const { _id, ...atraccion } = this.toObject();
    atraccion.idAtraccion = _id;

    return atraccion;
}

module.exports = model( 'Atraccion', atraccionSchema );