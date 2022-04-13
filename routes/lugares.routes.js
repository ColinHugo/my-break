import { Router } from 'express';
import { check } from 'express-validator';

import { dbValidators } from '../helpers/index.js';
import { validarCampos, validarJWT } from '../middlewares/index.js';

import * as lugares from '../controllers/lugares.controller.js';

const router = Router();

router.get( '/', lugares.getLugares );

router.post( '/', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio.' ).trim().notEmpty().escape(),
    check( 'ubicacion' ).trim().notEmpty(),
    check( 'descripcion' ).trim().escape(),
    check( 'precioPersona', 'Ingrese una cantidad válida.' ).trim().escape().isNumeric(),
    check( 'foto', 'La foto del lugar es obligatoria.' ).trim().notEmpty(),
    validarCampos
], lugares.postLugar );

router.put( '/:idLugar', [
    validarJWT,
    check( 'idLugar', 'No es un id válido' ).isMongoId(),
    check( 'idLugar' ).custom( dbValidators.existeLugar ),
    check( 'nombre', 'El nombre es obligatorio.' ).notEmpty().trim().escape(),
    check( 'ubicacion' ).trim().notEmpty(),
    check( 'descripcion' ).trim().escape(),
    check( 'precioPersona', 'Ingrese una cantidad válida.' ).trim().escape().isNumeric(),
    validarCampos
], lugares.putLugar );

router.delete( '/:idLugar', [
    validarJWT,
    check( 'idLugar', 'No es un id válido' ).isMongoId(),
    check( 'idLugar' ).custom( dbValidators.existeLugar ),
    validarCampos
], lugares.deleteLugar );

export default router;