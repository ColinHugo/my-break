import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

import dbConnection from './database/config.js';

class Server{

    constructor(){

        dotenv.config();

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {

        };

        this.conectarDB();

        this.middlewares();

    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json( { limit: '100mb' } ) );
        this.app.use( mongoSanitize() );
        
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto:', this.port );
        } );
    }

}

export default Server;