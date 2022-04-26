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
    check( 'nombre', 'El nombre es obligatorio.' ).escape().trim().notEmpty(),
    check( 'apellidos', 'Los apellidos son obligatorios.' ).escape().trim().notEmpty(),
    check( 'telefono', 'Número no válido.' ).trim().isNumeric().isLength( { min: 10, max: 10 } ),
    check( 'correo', 'El correo es obligatorio.' ).escape().trim().notEmpty(),
    check( 'correo', 'Ingrese un correo válido.' ).escape().trim().isEmail(),
    check( 'correo' ).custom( dbValidators.existeEmail ),
    check( 'password', 'El password es obligatorio.' ).escape().trim().notEmpty(),
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