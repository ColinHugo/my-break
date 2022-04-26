const { Schema, model } = require( 'mongoose' );

const atencionClienteSchema = Schema( {
    
    mensaje: {
        type: String,
        required: [ true, 'El mensaje es obligatorio.' ]
    },

    emisor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    foto: {
        type: String
    }
    
}, {
    versionKey: false
} );

atencionClienteSchema.methods.toJSON = function(){

    const { _id, ...mensaje } = this.toObject();
    mensaje.idMensaje = _id;

    return mensaje;
}

module.exports = model( 'Atencion_cliente', atencionClienteSchema );