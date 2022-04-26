const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { dbValidators } = require( '../helpers' );
const { validarCampos, validarJWT } = require( '../middlewares' );

const emergencias = require( '../controllers/emergencias.controller' );

router.get( '/', emergencias.getEmergencias );

router.post( '/', [
    validarJWT,
    check( 'descripcion', 'La descripción del contacto de emergencia es obligatorio.' ).trim().escape().notEmpty(),
    check( 'numero', 'El número telefónico de emergencia es obligatorio.' ).trim().escape().notEmpty(),
    validarCampos
], emergencias.postEmergencia );

router.put( '/:idEmergencia', [
    validarJWT,
    check( 'idEmergencia', 'No es un id válido' ).isMongoId(),
    check( 'idEmergencia' ).custom( dbValidators.existeEmergencia ),
    check( 'descripcion', 'La descripción del contacto de emergencia es obligatorio.' ).trim().escape().notEmpty(),
    check( 'numero', 'El número telefónico de emergencia es obligatorio.' ).trim().escape().notEmpty(),
    validarCampos
], emergencias.putEmergencia );

router.delete( '/:idEmergencia', [
    validarJWT,
    check( 'idEmergencia', 'No es un id válido' ).isMongoId(),
    check( 'idEmergencia' ).custom( dbValidators.existeEmergencia ),
    validarCampos
], emergencias.deleteEmergencia );

module.exports = router;