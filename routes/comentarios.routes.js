const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );

const comentarios = require( '../controllers/comentarios.controller' );

router.get( '/', comentarios.getComentarios );

router.post( '/', [
    validarJWT,
    check( 'mensaje', 'El mensaje es obligatorio.' ).trim().escape().notEmpty(),
    check( 'foto', 'La foto del comentario es obligatoria.' ).trim().notEmpty(),
    validarCampos
], comentarios.postComentario );

module.exports = router;