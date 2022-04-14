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
        trim: true
    },

    numeroAdultos: {
        type: Number,
        trim: true
    },

    numeroNinos: {
        type: Number,
        trim: true
    },

    fechaLlegada: {
        type: Date,
        trim: true,
        required: [ true, 'La fecha de llegada es obligatoria.' ],
    },

    fechaSalida: {
        type: Date,
        trim: true,
        required: [ true, 'La fecha de salida es obligatoria.' ],
    },

    estado: {
        type: Number,
        default: 2
    },

    lugar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lugar'
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