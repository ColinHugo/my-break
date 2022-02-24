import mongoose from 'mongoose';

const reservacionSchema = mongoose.Schema( {

    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio.' ],
        trim: true
    },

    apellidos: {
        type: String,
        required: [ true, 'Los apellidos son obligatorios.' ],
        trim: true
    },

    diasAReservar: {
        type: Number,
        required: [ true, 'Los días a reservar son obligatorios.' ],
        trim: true
    },

    numeroPersonas: {
        type: Number,
        trim: true
    },

    estado: {
        type: Boolean,
        default: false
    }

}, {
    versionKey: false
} );

reservacionSchema.methods.toJSON = function(){

    const { _id, ...reservacion } = this.toObject();
    reservacion.idReservacion = _id;

    return reservacion;
}

export default mongoose.model( 'Reservacion', reservacionSchema );