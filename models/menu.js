import mongoose from 'mongoose';

const menuSchema = mongoose.Schema( {

    nombre: {
        type: String,
        required: [ true, 'El nombre de la comida es obligatorio' ],
        trim: true
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripción de la comida es obligatoria' ],
        trim: true
    },

    precio: {
        type: Number,
        required: [ true, 'El precio de la comida es obligatorio' ],
        trim: true
    },

    foto: {
        type: String,
        trim: true
    },

}, {
    versionKey: false
} );

menuSchema.methods.toJSON = function(){
    const { _id, ...menu } = this.toObject();
    menu.idMenu = _id;

    return menu;
}

export default mongoose.model( 'Menu', menuSchema );