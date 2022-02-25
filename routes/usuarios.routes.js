import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/index.js';
import { dbValidators } from '../helpers/index.js';

import * as usuario from '../controllers/usuarios.controller.js';

const router = Router();

router.get( '/', usuario.getUsuarios );

router.get( '/:id', [
    check( 'id', 'No es un id válido.' ).isMongoId(),
    check( 'id' ).custom( dbValidators.existeUsuario ),
    validarCampos
], usuario.getUsuario );

router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio.' ).escape().trim().notEmpty(),
    check( 'apellidos', 'Los apellidos son obligatorios.' ).escape().trim().notEmpty(),
    check( 'telefono', 'Número no válido.' ).trim().isNumeric().isLength( { min: 10, max: 10 } ),
    check( 'correo', 'El correo es obligatorio.' ).escape().trim().notEmpty(),
    check( 'correo', 'Ingrese un correo válido.' ).escape().trim().isEmail(),
    check( 'correo' ).custom( dbValidators.existeEmail ),
    check( 'password', 'El password es obligatorio.' ).escape().trim().notEmpty(),
    check( 'password', 'El password debe tener al menos 5 caracteres.' ).escape().trim().isLength( { min: 5 } ),
    validarCampos
], usuario.postUsuario );

router.put( '/:id', [
    check( 'id', 'No es un id válido.' ).isMongoId(),
    check( 'id' ).custom( dbValidators.existeUsuario ),
    validarCampos
], usuario.putUsuario );

router.delete( '/:id', [
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( dbValidators.existeUsuario ),
    validarCampos
], usuario.deleteUsuario );

export default router;