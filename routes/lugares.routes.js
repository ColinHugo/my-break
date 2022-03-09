import { Router } from 'express';
import { check } from 'express-validator';

import { dbValidators } from '../helpers/index.js';
import { validarCampos } from '../middlewares/index.js';

import * as lugares from '../controllers/lugares.controller.js';

const router = Router();

router.get( '/', lugares.getLugares );

router.post( '/', [    
    check( 'tipo', 'El tipo del lugar es obligatorio.' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripcion del lugar es obligatoria.' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio del lugar es obligatorio.' ).escape().trim().notEmpty().isNumeric(),
    check( 'precio', 'El precio del lugar debe ser una cantidad válida.' ).isNumeric(),
    check( 'ubicacion', 'La ubicacion del lugar es obligatoria.' ).escape().trim().notEmpty(),
    check( 'contacto', 'El contacto del lugar es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], lugares.postLugar );

router.put( '/:idLugar', [
    check( 'idLugar', 'No es un id válido' ).isMongoId(),
    check( 'idLugar' ).custom( dbValidators.existeLugar ),
    check( 'tipo', 'El tipo del lugar es obligatorio.' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripcion del lugar es obligatoria.' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio del lugar es obligatorio.' ).escape().trim().notEmpty().isNumeric(),
    check( 'precio', 'El precio del lugar debe ser una cantidad válida.' ).isNumeric(),
    check( 'ubicacion', 'La ubicacion del lugar es obligatoria.' ).escape().trim().notEmpty(),
    check( 'contacto', 'El contacto del lugar es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], lugares.putLugar );

router.delete( '/:idLugar', [
    check( 'idLugar', 'No es un id válido.' ).isMongoId(),
    check( 'idLugar' ).custom( dbValidators.existeLugar ),
    validarCampos
], lugares.deleteLugar );

export default router;