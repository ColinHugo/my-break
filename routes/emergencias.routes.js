import { Router } from 'express';
import { check } from 'express-validator';

import { dbValidators } from '../helpers/index.js';
import { validarCampos, validarJWT } from '../middlewares/index.js';

import * as emergencias from '../controllers/emergencias.controller.js';

const router = Router();

router.get( '/', emergencias.getEmergencias );

router.post( '/', [
    validarJWT,
    check( 'descripcion', 'La descripción del contacto de emergencia es obligatorio.' ).trim().escape().notEmpty(),
    check( 'numero', 'El número telefónico de emergencia es obligatorio.' ).trim().escape().notEmpty(),
    validarCampos
], emergencias.postEmergencia );

router.put( '/:idEmergencia', [
    validarJWT,
    check( 'idEmergencia', 'No es un id válido' ).isMongoId(),
    check( 'idEmergencia' ).custom( dbValidators.existeEmergencia ),
    check( 'descripcion', 'La descripción del contacto de emergencia es obligatorio.' ).trim().escape().notEmpty(),
    check( 'numero', 'El número telefónico de emergencia es obligatorio.' ).trim().escape().notEmpty(),
    validarCampos
], emergencias.putEmergencia );

router.delete( '/:idEmergencia', [
    validarJWT,
    check( 'idEmergencia', 'No es un id válido' ).isMongoId(),
    check( 'idEmergencia' ).custom( dbValidators.existeEmergencia ),
    validarCampos
], emergencias.deleteEmergencia );

export default router;