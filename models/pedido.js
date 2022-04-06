import mongoose from 'mongoose';

const pedidoSchema = mongoose.Schema( {

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
        type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model( 'Pedido', pedidoSchema );