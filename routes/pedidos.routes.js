const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { dbValidators } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const pedidos = require( '../controllers/pedidos.controller' );

router.get( '/', pedidos.getPedidos );

router.get( '/:idPedido', [
    check( 'idPedido' ).custom( dbValidators.existePedido ),
    validarCampos
], pedidos.getPedido );

router.post( '/', [
    validarJWT,
    validarCampos
], pedidos.postPedido );

router.put( '/:idPedido', [
    validarJWT,
    check( 'idPedido', 'No es un id válido' ).isMongoId(),
    check( 'idPedido' ).custom( dbValidators.existePedido ),
    check( 'nombre', 'El nombre es obligatorio.' ).trim().escape().notEmpty(),
    check( 'descripcion', 'La descripcion es obligatoria.' ).trim().escape().notEmpty(),
    check( 'precio', 'El precio es obligatorio.' ).trim().escape().notEmpty(),
    check( 'precio', 'El precio debe ser un número válido.' ).isNumeric(),
    validarCampos
], pedidos.putPedido );

router.delete( '/:idPedido', [
    validarJWT,
    check( 'idPedido', 'No es un id válido' ).isMongoId(),
    check( 'idPedido' ).custom( dbValidators.existePedido ),
    validarCampos
], pedidos.deletePedido );

module.exports = router;