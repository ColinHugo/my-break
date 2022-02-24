import mongoose from 'mongoose';

const visitaSchema = mongoose.Schema( {

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

    foto: {
        type: String,
        trim: true
    },

}, {
    versionKey: false
} );

visitaSchema.methods.toJSON = function(){

    const { _id, ...visita } = this.toObject();
    visita.idVisita = _id;

    return visita;
}

export default mongoose.model( 'Visita', visitaSchema );