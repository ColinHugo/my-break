const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { dbValidators } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const promociones = require( '../controllers/promociones.controller' );

router.get( '/', promociones.getPromociones );

router.post( '/', [
    validarJWT,
    check( 'nombre', 'El nombre de la promoción es obligatorio.' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripcion de la promoción es obligatoria.' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio de la promoción es obligatorio.' ).escape().trim().notEmpty().isNumeric(),
    check( 'precio', 'El precio de la promoción debe ser una cantidad válida.' ).isNumeric(),
    check( 'foto', 'La foto de la promoción es obligatoria.' ).trim().notEmpty(),
    validarCampos
], promociones.postPromocion );

router.put( '/:idPromocion', [
    validarJWT,
    check( 'idPromocion', 'No es un id válido' ).isMongoId(),
    check( 'idPromocion' ).custom( dbValidators.existePromocion ),
    check( 'descripcion', 'La descripcion de la promoción es obligatoria.' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio de la promoción es obligatorio.' ).escape().trim().notEmpty().isNumeric(),
    check( 'precio', 'El precio de la promoción debe ser una cantidad válida.' ).isNumeric(),
    validarCampos
], promociones.putPromocion );

router.delete( '/:idPromocion', [
    validarJWT,
    check( 'idPromocion', 'No es un id válido.' ).isMongoId(),
    check( 'idPromocion' ).custom( dbValidators.existePromocion ),
    validarCampos
], promociones.deletePromocion );

module.exports = router;