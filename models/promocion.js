import mongoose from 'mongoose';

const promocionSchema = mongoose.Schema( {

    tipo: {
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

promocionSchema.methods.toJSON = function(){
    const { _id, ...promocion } = this.toObject();
    promocion.idPromocion = _id;

    return promocion;
}

export default mongoose.model( 'Promocion', promocionSchema );