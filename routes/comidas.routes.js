import { Router } from 'express';
import { check } from 'express-validator';

import { dbValidators } from '../helpers/index.js';
import { validarCampos, validarJWT } from '../middlewares/index.js';

import * as comidas from '../controllers/comidas.controller.js';

const router = Router();

router.get( '/', comidas.getComidas );

router.get( '/:idComida', [
    check( 'idComida' ).custom( dbValidators.existeComida ),
    validarCampos
], comidas.getComida );

router.post( '/', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio.' ).trim().escape().notEmpty(),
    check( 'descripcion', 'La descripcion es obligatoria.' ).trim().escape().notEmpty(),
    check( 'precio', 'El precio es obligatorio.' ).trim().escape().notEmpty(),
    check( 'precio', 'El precio debe ser un número válido.' ).isNumeric(),
    validarCampos
], comidas.postComida );

router.put( '/:idComida', [
    validarJWT,
    check( 'idComida', 'No es un id válido' ).isMongoId(),
    check( 'idComida' ).custom( dbValidators.existeComida ),
    check( 'nombre', 'El nombre es obligatorio.' ).trim().escape().notEmpty(),
    check( 'descripcion', 'La descripcion es obligatoria.' ).trim().escape().notEmpty(),
    check( 'precio', 'El precio es obligatorio.' ).trim().escape().notEmpty(),
    check( 'precio', 'El precio debe ser un número válido.' ).isNumeric(),
    validarCampos
], comidas.putComida );

router.delete( '/:idComida', [
    validarJWT,
    check( 'idComida', 'No es un id válido' ).isMongoId(),
    check( 'idComida' ).custom( dbValidators.existeComida ),
    validarCampos
], comidas.deleteComida );

export default router;