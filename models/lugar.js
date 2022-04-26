const { Schema, model } = require( 'mongoose' );

const lugarSchema = Schema( {

    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio.' ],
        trim: true
    },

    ubicacion: {
        type: String,
        trim: true
    },

    descripcion: {
        type: String,
        trim: true
    },

    precioPersona: {
        type: Number,
        trim: true
    },

    foto: [ {
        type: String,
        trim: true,
        maxItems: 7
    } ],

}, {
    versionKey: false
} );

lugarSchema.methods.toJSON = function(){

    const { _id, ...lugar } = this.toObject();
    lugar.idLugar = _id;

    return lugar;
}

module.exports = model( 'Lugar', lugarSchema );