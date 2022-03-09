import { Menu } from '../models/index.js';

const getMenus = async ( req, res ) => {

    try {

        const menus = await Menu.find();

        if ( menus.length === 0 ) {

            return res.status( 205 ).json( {
                value: 0,
                msg: 'No hay menús registrados.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            menus
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los menús.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener los menús.'
        } );
    }
};

const postMenu = async ( req, res ) => {

    try {

        const menu = new Menu( req.body );

        await menu.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'El menú se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar el menú.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar el menú.'
        } );
    }

};

const putMenu = async ( req, res ) => {

    const { idMenu } = req.params;

    try {

        await Menu.findByIdAndUpdate( idMenu, req.body );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'El menú se ha actualizado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el menú.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar el menú.'
        } );
    }
};

const deleteMenu = async ( req, res ) => {

    const { idMenu } = req.params;

    try {

        await Menu.findByIdAndDelete( idMenu );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'El menú se ha eliminado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el menú.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar lel menú.'
        } );
    }
};

export {
    getMenus,
    postMenu,
    putMenu,
    deleteMenu
}