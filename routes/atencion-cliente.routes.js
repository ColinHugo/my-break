const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { dbValidators } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const mensajes = require( '../controllers/atencion-cliente.controller' );

router.get( '/', mensajes.getMensajes );

router.post( '/', [
    validarJWT,
    check( 'mensaje', 'El mensaje es obligatorio.' ).escape().trim().notEmpty(),
    check( 'foto', 'La foto del mensaje es obligatorio.' ).trim().notEmpty(),
    validarCampos
], mensajes.postMensajes );

router.delete( '/:idMensaje', [
    validarJWT,
    check( 'idMensaje', 'No es un id válido.' ).isMongoId(),
    check( 'idMensaje' ).custom( dbValidators.existeMensaje ),
    validarCampos
], mensajes.deleteMensajes );

module.exports = router;