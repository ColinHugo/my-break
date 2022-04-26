const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { dbValidators } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const reportes = require( '../controllers/reportes.controller' );

router.get( '/', reportes.getReportes );

router.post( '/:idEncargado', [
    validarJWT,
    check( 'idEncargado', 'No es un id válido.' ).isMongoId(),
    check( 'descripcion', 'La descripción del reporte es obligatoria.' ).trim().escape().notEmpty(),
    check( 'idEncargado' ).custom( dbValidators.existeUsuario ),
    validarCampos
], reportes.postReporte );

module.exports = router;