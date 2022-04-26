const { Schema, model } = require( 'mongoose' );

const emergenciaSchema = Schema( {

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

module.exports = model( 'Emergencia', emergenciaSchema );