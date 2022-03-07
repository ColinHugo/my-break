import { Comida } from '../models/index.js';

const getComidas = async ( req, res ) => {

    try {

        const comidas = await Comida.find();

        if ( comidas.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay comidas registradas.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            comidas
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener las comidas.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las comidas.'
        } );
    }
};

const getComida = async ( req, res ) => {

    const { idComida } = req.params;

    try {

        const comida = await Comida.findById( idComida );

        return res.status( 200 ).json( {
            value: 1,
            comida
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener la comida.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener la comida.'
        } );
    }
};

const postComida = async ( req, res ) => {

    try {

        const comida = new Comida( req.body );

        await comida.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La comida se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la comida.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar la comida.'
        } );
    }

};

const putComida = async ( req, res ) => {

    const { idComida } = req.params;

    try {

        await Comida.findByIdAndUpdate( idComida, req.body );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La comida se ha actualizado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la comida.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar la comida.'
        } );
    }
};

const deleteComida = async ( req, res ) => {

    const { idComida } = req.params;

    try {

        await Comida.findByIdAndDelete( idComida );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'La comida se ha eliminado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la comida.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar la comida.'
        } );
    }
};

export {
    getComidas,
    getComida,
    postComida,
    putComida,
    deleteComida
}