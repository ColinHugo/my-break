import { Router } from 'express';
import { check } from 'express-validator';

import { dbValidators } from '../helpers/index.js';
import { validarCampos } from '../middlewares/index.js';

import * as promociones from '../controllers/promociones.controller.js';

const router = Router();

router.get( '/', promociones.getPromociones );

router.post( '/', [    
    check( 'tipo', 'El tipo de promoción es obligatorio.' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripcion de la promoción es obligatoria.' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio de la promoción es obligatorio.' ).escape().trim().notEmpty().isNumeric(),
    check( 'precio', 'El precio de la promoción debe ser una cantidad válida.' ).isNumeric(),
    check( 'ubicacion', 'La ubicacion de la promoción es obligatoria.' ).escape().trim().notEmpty(),
    check( 'contacto', 'El contacto de la promoción es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], promociones.postPromocion );

router.put( '/:idPromocion', [
    check( 'idPromocion', 'No es un id válido' ).isMongoId(),
    check( 'idPromocion' ).custom( dbValidators.existePromocion ),
    check( 'tipo', 'El tipo de la promoción es obligatorio.' ).escape().trim().notEmpty(),
    check( 'descripcion', 'La descripcion de la promoción es obligatoria.' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio de la promoción es obligatorio.' ).escape().trim().notEmpty().isNumeric(),
    check( 'precio', 'El precio de la promoción debe ser una cantidad válida.' ).isNumeric(),
    check( 'ubicacion', 'La ubicacion de la promoción es obligatoria.' ).escape().trim().notEmpty(),
    check( 'contacto', 'El contacto de la promoción es obligatorio.' ).escape().trim().notEmpty(),
    validarCampos
], promociones.putPromocion );

router.delete( '/:idPromocion', [
    check( 'idPromocion', 'No es un id válido.' ).isMongoId(),
    check( 'idPromocion' ).custom( dbValidators.existePromocion ),
    validarCampos
], promociones.deletePromocion );

export default router;