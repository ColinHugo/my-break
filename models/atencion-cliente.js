import mongoose from 'mongoose';

const atencionClienteSchema = mongoose.Schema( {
    
    mensaje: {
        type: String,
        required: [ true, 'El mensaje es obligatorio.' ]
    },

    emisor: {
        type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model( 'Atencion_cliente', atencionClienteSchema );