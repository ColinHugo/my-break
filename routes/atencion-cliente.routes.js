import { Router } from 'express';
import { check } from 'express-validator';

import { dbValidators } from '../helpers/index.js';
import { validarCampos, validarJWT } from '../middlewares/index.js';

import * as mensajes from '../controllers/atencion-cliente.controller.js';

const router = Router();

router.get( '/:idUsuario', [
    check( 'idUsuario', 'No es un id válido.' ).isMongoId(),
    check( 'idUsuario' ).custom( dbValidators.existeUsuario ),
    validarCampos
], mensajes.getMensajes );

router.post( '/:idReceptor', [
    validarJWT,
    check( 'mensaje', 'El mensaje es obligatorio.' ).escape().trim().notEmpty(),
    check( 'idReceptor' ).custom( dbValidators.existeUsuario ),
    validarCampos
], mensajes.postMensajes );

router.delete( '/:idMensaje', [
    validarJWT,
    check( 'idMensaje', 'No es un id válido.' ).isMongoId(),
    validarCampos
], mensajes.deleteMensajes );

export default router;