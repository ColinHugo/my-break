const { Schema, model } = require( 'mongoose' );

const pedidoSchema = Schema( {

    pedido: [ {

        nombre: {
            type: String
        },

        precio: {
            type: Number
        },

        cantidad: {
            type: Number
        },

        total: {
            type: Number
        },

        _id: false
    } ],

    total: {
        type: Number
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
    
}, {
    versionKey: false,
    timestamps: true
} );

pedidoSchema.pre( 'save', function () {

    const { pedido } = this;
     
    pedido.forEach( platillo => {
        platillo.total = platillo.precio * platillo.cantidad;
    } );
} );

pedidoSchema.methods.toJSON = function(){
    const { _id, ...pedido } = this.toObject();
    pedido.idPedido = _id;

    return pedido;
}

module.exports = model( 'Pedido', pedidoSchema );