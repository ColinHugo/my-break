import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos, validarJWT } from '../middlewares/index.js';

import * as comentarios from '../controllers/comentarios.controller.js';

const router = Router();

router.get( '/', comentarios.getComentarios );

router.post( '/', [
    validarJWT,
    check( 'mensaje', 'El mensaje es obligatorio.' ).trim().escape().notEmpty(),
    validarCampos
], comentarios.postComentario );

export default router;