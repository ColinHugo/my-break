import { Router } from 'express';
import { check } from 'express-validator';

import { dbValidators } from '../helpers/index.js';
import { validarCampos } from '../middlewares/index.js';

import * as reportes from '../controllers/reportes.controller.js';

const router = Router();

router.get( '/', reportes.getReportes );

router.post( '/:idEncargado', [
    check( 'idEncargado', 'No es un id válido.' ).isMongoId(),
    check( 'descripcion', 'La descripción del reporte es obligatoria.' ).trim().escape().notEmpty(),
    check( 'idEncargado' ).custom( dbValidators.existeUsuario ),
    validarCampos
], reportes.postReporte );

export default router;