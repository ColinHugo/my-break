const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { dbValidators } = require( '../helpers' );
const { validarCampos } = require( '../middlewares' );

const reservacion = require( '../controllers/reservaciones.controller' );

router.get( '/', reservacion.getReservaciones );

router.get( '/:idReservacion', [
    check( 'idReservacion', 'No es un id válido.' ).isMongoId(),
    check( 'idReservacion' ).custom( dbValidators.existeReservacion ),
    validarCampos
], reservacion.getReservacion );

router.post( '/:idLugar', [
    check( 'nombre', 'El nombre es obligatorio.' ).trim().notEmpty().escape(),
    check( 'apellidos', 'Los apellidos son obligatorios.' ).trim().notEmpty().escape(),
    check( 'telefono', 'Ingrese un número telefónico válido.' ).trim().notEmpty().escape().isLength( { min: 10, max: 10 } ),
    check( 'correo', 'Ingrese un correo electrónico válido.' ).trim().notEmpty().escape().isEmail(),
    check( 'numeroAdultos', 'Ingrese una cantidad válida para adultos.' ).trim().isNumeric().toInt(),
    check( 'numeroNinos', 'Ingrese una cantidad válida para niños.' ).trim().isNumeric().toInt(),
    check( 'fechaLlegada', 'Ingrese una fecha de llegada válida.' ).trim().notEmpty().escape().isDate(),
    check( 'fechaSalida', 'Ingrese una fecha de salida válida.' ).trim().notEmpty().escape().isDate(),
    check( 'idLugar' ).custom( dbValidators.existeLugar ),
    validarCampos
], reservacion.postReservacion );

router.put( '/:idReservacion', [
    check( 'idReservacion', 'No es un id válido' ).isMongoId(),
    check( 'idReservacion' ).custom( dbValidators.existeReservacion ),
    validarCampos
], reservacion.putReservacion );

router.delete( '/:idReservacion', [
    check( 'idReservacion', 'No es un id válido' ).isMongoId(),
    check( 'idReservacion' ).custom( dbValidators.existeReservacion ),
    validarCampos
], reservacion.deleteReservacion );

module.exports = router;