import mongoose from 'mongoose';

const emergenciaSchema = mongoose.Schema( {

    descripcion: {
        type: String,
        trim: true,
        required: [ true, 'La descripción es obligatoria.' ]
    },

    numero: {
        type: String,
        trim: true,
        required: [ true, 'El número telefónico es obligatorio.' ]
    }
}, {
    versionKey: false
} );

emergenciaSchema.methods.toJSON = function(){
    const { _id, ...emergencia } = this.toObject();
    emergencia.idEmergencia = _id;

    return emergencia;
}

export default mongoose.model( 'Emergencia', emergenciaSchema );