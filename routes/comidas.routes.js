const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { dbValidators } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const comidas = require( '../controllers/comidas.controller' );

router.get( '/', comidas.getComidas );

router.get( '/:idComida', [
    check( 'idComida' ).custom( dbValidators.existeComida ),
    validarCampos
], comidas.getComida );

router.post( '/', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio.' ).trim().escape().notEmpty(),
    check( 'descripcion', 'La descripcion es obligatoria.' ).trim().escape().notEmpty(),
    check( 'precio', 'Ingrese un precio válido.' ).trim().isNumeric().notEmpty(),
    validarCampos
], comidas.postComida );

router.put( '/:idComida', [
    validarJWT,
    check( 'idComida', 'No es un id válido' ).isMongoId(),
    check( 'idComida' ).custom( dbValidators.existeComida ),
    check( 'nombre', 'El nombre es obligatorio.' ).trim().escape().notEmpty(),
    check( 'descripcion', 'La descripcion es obligatoria.' ).trim().escape().notEmpty(),
    check( 'precio', 'El precio es obligatorio.' ).trim().escape().notEmpty(),
    check( 'precio', 'El precio debe ser un número válido.' ).isNumeric(),
    validarCampos
], comidas.putComida );

router.delete( '/:idComida', [
    validarJWT,
    check( 'idComida', 'No es un id válido' ).isMongoId(),
    check( 'idComida' ).custom( dbValidators.existeComida ),
    validarCampos
], comidas.deleteComida );

module.exports = router;