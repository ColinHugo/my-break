import mongoose from 'mongoose';

const lugarSchema = mongoose.Schema( {

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

export default mongoose.model( 'Lugar', lugarSchema );