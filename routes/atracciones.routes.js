const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { dbValidators } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const atracciones = require( '../controllers/atracciones.controller' );

router.get( '/', atracciones.getAtracciones );

router.post( '/', [
    validarJWT,
    check( 'tipo', 'El tipo de la atracción es obligatoria.' ).trim().escape(),
    check( 'descripcion', 'La descripcion de la atracción es obligatoria.' ).trim().escape(),
    check( 'ubicacion', 'La ubicacion de la atracción es obligatoria.' ).trim().notEmpty(),
    check( 'contacto', 'El contacto de la atracción es obligatoria.' ).trim().escape(),
    check( 'foto', 'La foto de la atracción es obligatoria.' ).trim().notEmpty(),
    validarCampos
], atracciones.postAtraccion );

router.put( '/:idAtraccion', [
    validarJWT,
    check( 'idAtraccion', 'No es un id válido' ).isMongoId(),
    check( 'idAtraccion' ).custom( dbValidators.existeAtraccion ),
    validarCampos
], atracciones.putAtraccion );

router.delete( '/:idAtraccion', [
    validarJWT,
    check( 'idAtraccion', 'No es un id válido' ).isMongoId(),
    check( 'idAtraccion' ).custom( dbValidators.existeAtraccion ),
    validarCampos
], atracciones.deleteAtraccion );

module.exports = router;