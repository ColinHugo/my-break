import { Router } from 'express';
import { check } from 'express-validator';

import { iniciarSesion } from '../controllers/auth.controller.js';
import { validarCampos } from '../middlewares/index.js';

const router = Router();

router.post( '/login', [
    check( 'correo', 'El correo es obligatorio' ).escape().trim().notEmpty(),
    check( 'correo', 'Ingrese un correo válido' ).escape().trim().isEmail(),
    check( 'password', 'La contraseña es obligatoria' ).escape().trim().notEmpty(),
    validarCampos
], iniciarSesion );

export default router;