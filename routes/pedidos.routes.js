import { Router } from 'express';
import { check } from 'express-validator';

import { dbValidators } from '../helpers/index.js';
import { validarCampos, validarJWT } from '../middlewares/index.js';

import * as pedidos from '../controllers/pedidos.controller.js';

const router = Router();

router.get( '/', pedidos.getPedidos );

router.get( '/:idPedido', [
    check( 'idPedido' ).custom( dbValidators.existeComida ),
    validarCampos
], pedidos.getPedido );

router.post( '/', [
    validarJWT,
    validarCampos
], pedidos.postPedido );

router.put( '/:idPedido', [
    validarJWT,
    check( 'idPedido', 'No es un id válido' ).isMongoId(),
    check( 'idPedido' ).custom( dbValidators.existePedido ),
    check( 'nombre', 'El nombre es obligatorio.' ).trim().escape().notEmpty(),
    check( 'descripcion', 'La descripcion es obligatoria.' ).trim().escape().notEmpty(),
    check( 'precio', 'El precio es obligatorio.' ).trim().escape().notEmpty(),
    check( 'precio', 'El precio debe ser un número válido.' ).isNumeric(),
    validarCampos
], pedidos.putPedido );

router.delete( '/:idPedido', [
    validarJWT,
    check( 'idPedido', 'No es un id válido' ).isMongoId(),
    check( 'idPedido' ).custom( dbValidators.existePedido ),
    validarCampos
], pedidos.deletePedido );

export default router;