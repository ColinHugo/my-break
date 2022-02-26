import { Router } from 'express';
import { check } from 'express-validator';

import { dbValidators } from '../helpers/index.js';
import { validarCampos } from '../middlewares/index.js';

import * as visitas from '../controllers/visitas.controller.js';

const router = Router();

router.get( '/', visitas.getVisitas );

router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio.' ).notEmpty().trim().escape(),
    check( 'ubicacion' ).trim().escape(),
    check( 'descripcion' ).trim().escape(),
    check( 'precioPersona', 'Ingrese una cantidad válida.' ).trim().escape().isNumeric(),
    validarCampos
], visitas.postVisita );

router.put( '/:idVisita', [
    check( 'idVisita', 'No es un id válido' ).isMongoId(),
    check( 'idVisita' ).custom( dbValidators.existeVisita ),
    validarCampos
], visitas.putVisita );

router.delete( '/:idVisita', [
    check( 'idVisita', 'No es un id válido' ).isMongoId(),
    check( 'idVisita' ).custom( dbValidators.existeVisita ),
    validarCampos
], visitas.deleteVisita );

export default router;