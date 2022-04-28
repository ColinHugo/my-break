const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { dbValidators } = require( '../helpers' );
const { validarCampos } = require( '../middlewares' );

const usuario = require( '../controllers/usuarios.controller' );

router.get( '/', usuario.getUsuarios );

router.get( '/:idUsuario', [
    check( 'idUsuario', 'No es un id válido.' ).isMongoId(),
    check( 'idUsuario' ).custom( dbValidators.existeUsuario ),
    validarCampos
], usuario.getUsuario );

router.post( '/', [
    check( 'nombre', 'Ingrese un nombre válido.' ).escape().trim().matches( /^[A-Za-z\s\u00C0-\u017F]+$/ ),
    check( 'apellidos', 'Ingrese apellidos válidos.' ).escape().trim().matches( /^[A-Za-z\s\u00C0-\u017F]+$/ ),
    check( 'telefono', 'Ingrese un número telefónico válido.' ).trim().isNumeric().isLength( { min: 10, max: 10 } ),
    check( 'correo', 'Ingrese un correo válido.' ).escape().trim().isEmail(),
    check( 'correo' ).custom( dbValidators.existeEmail ),
    check( 'password', 'El password debe tener al menos 5 caracteres.' ).escape().trim().isLength( { min: 5 } ),
    validarCampos
], usuario.postUsuario );

router.put( '/:idUsuario', [
    check( 'idUsuario', 'No es un id válido.' ).isMongoId(),
    check( 'idUsuario' ).custom( dbValidators.existeUsuario ),
    validarCampos
], usuario.putUsuario );

router.delete( '/:idUsuario', [
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    check( 'idUsuario' ).custom( dbValidators.existeUsuario ),
    validarCampos
], usuario.deleteUsuario );

module.exports = router;