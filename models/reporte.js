const { Schema, model } = require( 'mongoose' );

const reporteSchema = Schema( {

    descripcion: {
        type: String,
        trim: true,
        required: [ true, 'La descripción del reporte es obligatorio.' ],
    },

    foto: {
        type: String,
        trim: true
    },

}, {
    versionKey: false
} );

reporteSchema.methods.toJSON = function(){

    const { _id, ...reporte } = this.toObject();
    reporte.idReporte = _id;

    return reporte;
}

module.exports = model( 'Reporte', reporteSchema );