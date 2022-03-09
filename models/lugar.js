import mongoose from 'mongoose';

const lugarSchema = mongoose.Schema( {

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

lugarSchema.methods.toJSON = function(){
    const { _id, ...lugar } = this.toObject();
    lugar.idLugar = _id;

    return lugar;
}


export default mongoose.model( 'Lugar', lugarSchema );