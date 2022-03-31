import mongoose from 'mongoose';

const promocionSchema = mongoose.Schema( {

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

export default mongoose.model( 'Promocion', promocionSchema );