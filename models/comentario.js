const { Schema, model } = require( 'mongoose' );

const comentarioSchema = Schema( {

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

module.exports = model( 'Comentario', comentarioSchema );