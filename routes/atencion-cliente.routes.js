import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos, validarJWT } from '../middlewares/index.js';

import * as mensajes from '../controllers/atencion-cliente.controller.js';

const router = Router();

router.get( '/', mensajes.getMensajes );

router.post( '/', [
    validarJWT,
    check( 'mensaje', 'El mensaje es obligatorio.' ).escape().trim().notEmpty(),
    check( 'foto', 'La foto del mensaje es obligatorio.' ).trim().notEmpty(),
    validarCampos
], mensajes.postMensajes );

router.delete( '/:idMensaje', [
    validarJWT,
    check( 'idMensaje', 'No es un id válido.' ).isMongoId(),
    validarCampos
], mensajes.deleteMensajes );

export default router;