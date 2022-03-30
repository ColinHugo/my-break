import { Router } from 'express';
import { check } from 'express-validator';

import { dbValidators } from '../helpers/index.js';
import { validarCampos } from '../middlewares/index.js';

import * as lugares from '../controllers/lugares.controller.js';

const router = Router();

router.get( '/', lugares.getLugares );

router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio.' ).trim().notEmpty().escape(),
    check( 'ubicacion' ).trim().notEmpty(),
    check( 'descripcion' ).trim().escape(),
    check( 'precioPersona', 'Ingrese una cantidad válida.' ).trim().escape().isNumeric(),
    validarCampos
], lugares.postLugar );

router.put( '/:idLugar', [
    check( 'idLugar', 'No es un id válido' ).isMongoId(),
    check( 'idLugar' ).custom( dbValidators.existeLugar ),
    check( 'nombre', 'El nombre es obligatorio.' ).notEmpty().trim().escape(),
    check( 'ubicacion' ).trim().escape(),
    check( 'descripcion' ).trim().escape(),
    check( 'precioPersona', 'Ingrese una cantidad válida.' ).trim().escape().isNumeric(),
    validarCampos
], lugares.putLugar );

router.delete( '/:idLugar', [
    check( 'idLugar', 'No es un id válido' ).isMongoId(),
    check( 'idLugar' ).custom( dbValidators.existeLugar ),
    validarCampos
], lugares.deleteLugar );

export default router;