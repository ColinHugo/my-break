import { Router } from 'express';

import { check } from 'express-validator';

import { validarCampos } from '../middlewares/index.js';
import { dbValidators } from '../helpers/index.js';

import * as reservacion from '../controllers/reservacion.controller.js';

const router = Router();

router.get( '/', reservacion.getReservaciones );

router.get( '/:idReservacion', [
    check( 'idReservacion', 'No es un id válido.' ).isMongoId(),
    check( 'idReservacion' ).custom( dbValidators.existeReservacion ),
    validarCampos
], reservacion.getReservacion );

router.post( '/:idVisita', [
    check( 'nombre', 'El nombre es obligatorio.' ).trim().notEmpty().escape(),
    check( 'apellidos', 'Los apellidos son obligatorios.' ).trim().notEmpty().escape(),
    check( 'diasAReservar', 'Ingrese una cantidad válida para días a reservar.' ).trim().isNumeric().toInt(),
    check( 'numeroPersonas', 'Ingrese una cantidad válida para el número de personas.' ).trim().isNumeric().toInt(),
    check( 'idVisita' ).custom( dbValidators.existeVisita ),
    validarCampos
], reservacion.postReservacion );

router.put( '/:idReservacion', [
    check( 'idReservacion', 'No es un id válido' ).isMongoId(),
    check( 'idReservacion' ).custom( dbValidators.existeReservacion ),
    validarCampos
], reservacion.putReservacion );

export default router;