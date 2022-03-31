import { Router } from 'express';
import { check } from 'express-validator';

import { dbValidators } from '../helpers/index.js';
import { validarCampos, validarJWT } from '../middlewares/index.js';

import * as atracciones from '../controllers/atracciones.controller.js';

const router = Router();

router.get( '/', atracciones.getAtracciones );

router.post( '/', [
    validarJWT,
    check( 'tipo' ).trim().escape(),
    check( 'descripcion' ).trim().escape(),
    check( 'ubicacion' ).trim().escape(),
    check( 'contacto' ).trim().escape(),
    validarCampos
], atracciones.postAtraccion );

router.put( '/:idAtraccion', [
    validarJWT,
    check( 'idAtraccion', 'No es un id válido' ).isMongoId(),
    check( 'idAtraccion' ).custom( dbValidators.existeAtraccion ),
    validarCampos
], atracciones.putAtraccion );

router.delete( '/:idAtraccion', [
    validarJWT,
    check( 'idAtraccion', 'No es un id válido' ).isMongoId(),
    check( 'idAtraccion' ).custom( dbValidators.existeAtraccion ),
    validarCampos
], atracciones.deleteAtraccion );

export default router;