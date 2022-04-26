const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { dbValidators } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const lugares = require( '../controllers/lugares.controller' );

router.get( '/', lugares.getLugares );

router.post( '/', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio.' ).trim().notEmpty().escape(),
    check( 'ubicacion' ).trim().notEmpty(),
    check( 'descripcion' ).trim().escape(),
    check( 'precioPersona', 'Ingrese una cantidad válida.' ).trim().escape().isNumeric(),
    check( 'foto', 'La foto del lugar es obligatoria.' ).trim().notEmpty(),
    validarCampos
], lugares.postLugar );

router.put( '/:idLugar', [
    validarJWT,
    check( 'idLugar', 'No es un id válido' ).isMongoId(),
    check( 'idLugar' ).custom( dbValidators.existeLugar ),
    check( 'nombre', 'El nombre es obligatorio.' ).notEmpty().trim().escape(),
    check( 'ubicacion' ).trim().notEmpty(),
    check( 'descripcion' ).trim().escape(),
    check( 'precioPersona', 'Ingrese una cantidad válida.' ).trim().escape().isNumeric(),
    validarCampos
], lugares.putLugar );

router.delete( '/:idLugar', [
    validarJWT,
    check( 'idLugar', 'No es un id válido' ).isMongoId(),
    check( 'idLugar' ).custom( dbValidators.existeLugar ),
    validarCampos
], lugares.deleteLugar );

module.exports = router;