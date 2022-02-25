import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema( {

    estado: {
        type: Boolean,        
        default: true
    },

    nombre: {
        type: String,
        required: true,
        trim: true
    },

    apellidos: {
        type: String,
        required: true,
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

    password: {
        type: String,
        required: true,
        trim: true
    },

    perfil: {
        type: Number,
        default: 3
    }

}, {
    versionKey: false
} );

usuarioSchema.pre( 'save', async function ( next ){

    if ( !this.isModified( 'password' ) ) {
        next();
    }

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash( this.password, salt );
} );

usuarioSchema.methods.comprobarPassword = async function ( password ) {
    return await bcrypt.compare( password, this.password );
}

usuarioSchema.methods.toJSON = function () {
    const { _id, estado, password, ...usuario } = this.toObject();
    usuario.idUsuario = _id;
    return usuario;
}

export default mongoose.model( 'Usuario', usuarioSchema );