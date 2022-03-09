import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

import dbConnection from './database/config.js';

import atencionCliente from './routes/atencion-cliente.routes.js';
import atracciones from './routes/atracciones.routes.js';
import auth from './routes/auth.routes.js';
import comentarios from './routes/comentarios.routes.js';
import comidas from './routes/comidas.routes.js';
import emergencias from './routes/emergencias.routes.js';
import lugares from './routes/lugares.routes.js';
import menus from './routes/menus.routes.js';
import reportes from './routes/reportes.routes.js';
import reservaciones from './routes/reservaciones.routes.js';
import usuarios from './routes/usuarios.routes.js';
import visitas from './routes/visitas.routes.js';

class Server{

    constructor(){

        dotenv.config();

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            atencionCliente: '/atencion-cliente',
            atracciones: '/atracciones',
            auth: '/auth',
            comentarios: '/comentarios',
            comidas: '/comidas',
            emergencias: '/emergencias',
            lugares: '/lugares',
            menus: '/menus',
            reportes: '/reportes',
            reservaciones: '/reservaciones',
            usuarios: '/usuarios',
            visitas: '/visitas'
        };

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( mongoSanitize() );
    }

    routes(){
        this.app.use( this.paths.atencionCliente, atencionCliente );
        this.app.use( this.paths.atracciones, atracciones );
        this.app.use( this.paths.auth, auth );
        this.app.use( this.paths.comidas, comidas );
        this.app.use( this.paths.comentarios, comentarios );
        this.app.use( this.paths.emergencias, emergencias );
        this.app.use( this.paths.lugares, lugares );
        this.app.use( this.paths.menus, menus );
        this.app.use( this.paths.reportes, reportes );
        this.app.use( this.paths.reservaciones, reservaciones );
        this.app.use( this.paths.usuarios, usuarios );
        this.app.use( this.paths.visitas, visitas );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto:', this.port );
        } );
    }
}

export default Server;