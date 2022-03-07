import mongoose from 'mongoose';

const comentarioSchema = mongoose.Schema( {

    mensaje: {
        type: String,
        trim: true,
        required: [ true, 'El mensaje es obligatorio.' ]
    },

    foto: {
        type: String,
        trim: true
    }
}, {
    versionKey: false
} );

comentarioSchema.methods.toJSON = function(){
    const { _id, ...comentario } = this.toObject();
    comentario.idComentario = _id;

    return comentario;
}

export default mongoose.model( 'Comentario', comentarioSchema );