const { Pedido } = require( '../models' );

const getPedidos = async ( req, res ) => {

    try {

        const pedidos = await Pedido.find()
            .populate( 'usuario', [ 'nombre', 'apellidos' ] );

        if ( pedidos.length === 0 ) {

            return res.status( 404 ).json( {
                value: 0,
                msg: 'No hay órdenes registradas.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            pedidos
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las órdenes.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las órdenes.'
        } );
    }
};

const getPedido = async ( req, res ) => {

    const { idPedido } = req.params;

    try {

        const pedido = await Pedido.findById( idPedido );

        return res.status( 200 ).json( {
            value: 1,
            pedido
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la orden.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener la orden.'
        } );
    }
};

const postPedido = async ( req, res ) => {

    try {

        const orden = new Pedido( req.body );

        await orden.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La orden se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la orden.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar la orden.'
        } );
    }
};

const putPedido = async ( req, res ) => {

    const { idPedido } = req.params;

    try {

        await Pedido.findByIdAndUpdate( idPedido, req.body );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La orden se ha actualizado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la orden.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar la orden.'
        } );
    }
};

const deletePedido = async ( req, res ) => {

    const { idPedido } = req.params;

    try {

        await Pedido.findByIdAndDelete( idPedido );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La orden se ha concluido correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la orden.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar la comida.'
        } );
    }
};

module.exports = {
    getPedidos,
    getPedido,
    postPedido,
    putPedido,
    deletePedido
}