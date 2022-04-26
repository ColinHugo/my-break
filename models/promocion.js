const { Schema, model } = require( 'mongoose' );

const promocionSchema = Schema( {

    nombre: {
        type: String,        
        trim: true
    },

    descripcion: {
        type: String,
        trim: true
    },

    precio: {
        type: Number,
        trim: true
    },

    foto: [ {
        type: String,
        trim: true,
        maxItems: 3
    } ],

}, {
    versionKey: false
} );

promocionSchema.methods.toJSON = function(){
    const { _id, ...promocion } = this.toObject();
    promocion.idPromocion = _id;

    return promocion;
}

module.exports = model( 'Promocion', promocionSchema );