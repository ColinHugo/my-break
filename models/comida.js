const { Schema, model } = require( 'mongoose' );

const comidaSchema = Schema( {

    nombre: {
        type: String,
        trim: true,
        required: [ true, 'El nombre de la comida es obligatorio.' ]
    },

    descripcion: {
        type: String,
        trim: true,
        required: [ true, 'La descripción de la comida es obligatoria.' ]
    },

    precio: {
        type: Number,
        trim: true,
        required: [ true, 'El precio de la comida es obligatorio.' ]
    },

    foto: {
        type: String,
        trim: true
    }
}, {
    versionKey: false
} );

comidaSchema.methods.toJSON = function(){
    const { _id, ...comida } = this.toObject();
    comida.idComida = _id;

    return comida;
}

module.exports = model( 'Comida', comidaSchema );