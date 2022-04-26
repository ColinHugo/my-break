const { Schema, model } = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );

const usuarioSchema = Schema( {

    estado: {
        type: Boolean,        
        default: true
    },

    nombre: {
        type: String,
        required: [ true, 'El nombre del usuario es obligatorio.' ],
        trim: true
    },

    apellidos: {
        type: String,
        required: [ true, 'Los apellidos del usuario son obligatorios.' ],
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
    },

    foto: {
        type: String,
        trim: true
    },

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

usuarioSchema.statics.encryptPassword = async ( password ) => {
    
    const salt = await bcrypt.genSalt();

    return bcrypt.hashSync( password, salt );
}

usuarioSchema.methods.comprobarPassword = async function ( password ) {
    return await bcrypt.compare( password, this.password );
}

usuarioSchema.methods.toJSON = function () {
    const { _id, estado, password, ...usuario } = this.toObject();
    usuario.idUsuario = _id;
    return usuario;
}

module.exports = model( 'Usuario', usuarioSchema );