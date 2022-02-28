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

    telefono: {
        type: String,
        default: null,
        trim: true
    },

    correo: {
        type: String,
        required: true,
        unique: true,
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
    },

    visita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visita'
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