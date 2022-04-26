const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const iniciarSesion = require( '../controllers/auth.controller' );
const { validarCampos } = require( '../middlewares' );

router.post( '/login', [
    check( 'correo', 'El correo es obligatorio' ).escape().trim().notEmpty(),
    check( 'correo', 'Ingrese un correo válido' ).escape().trim().isEmail(),
    check( 'password', 'La contraseña es obligatoria' ).escape().trim().notEmpty(),
    validarCampos
], iniciarSesion );

module.exports = router;