import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

import dbConnection from './database/config.js';

import reservacion from './routes/reservacion.routes.js';
import visitas from './routes/visitas.routes.js';

class Server{

    constructor(){

        dotenv.config();

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            reservacion: '/reservacion',
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
        this.app.use( this.paths.reservacion, reservacion );
        this.app.use( this.paths.visitas, visitas );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto:', this.port );
        } );
    }
}

export default Server;