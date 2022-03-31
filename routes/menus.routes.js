import { Router } from 'express';
import { check } from 'express-validator';

import { dbValidators } from '../helpers/index.js';
import { validarCampos, validarJWT } from '../middlewares/index.js';

import * as menus from '../controllers/menus.controller.js';

const router = Router();

router.get( '/', menus.getMenus );

router.post( '/', [
    validarJWT,
    check( 'nombre', 'El nombre de la comida es obligatorio.' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción de la comida es obligatoria.' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio de la comida es obligatorio.' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio de la comida debe ser una cantidad válida.' ).isNumeric(),
    validarCampos
], menus.postMenu );

router.put( '/:idMenu', [
    validarJWT,
    check( 'idMenu', 'No es un id válido' ).isMongoId(),
    check( 'idMenu' ).custom( dbValidators.existeMenu ),
    check( 'nombre', 'El nombre de la comida es obligatorio.' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripción de la comida es obligatoria.' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio de la comida es obligatorio.' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio de la comida debe ser una cantidad válida.' ).isNumeric(),
    validarCampos
], menus.putMenu );

router.delete( '/:idMenu', [
    validarJWT,
    check( 'idMenu', 'No es un id válido.' ).isMongoId(),
    check( 'idMenu' ).custom( dbValidators.existeMenu ),
    validarCampos
], menus.deleteMenu );

export default router;