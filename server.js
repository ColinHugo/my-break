const path = require( 'path' );
const express = require( 'express' );
const cors = require( 'cors' );
const mongoSanitize = require( 'express-mongo-sanitize' );

const dbConnection = require( './database/config' );

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            atencionCliente: '/atencion-cliente',
            atracciones: '/atracciones',
            auth: '/auth',
            comentarios: '/comentarios',
            comidas: '/comidas',
            emergencias: '/emergencias',
            promociones: '/promociones',
            lugares: '/lugares',
            pedidos: '/pedidos',
            promociones: '/promociones',
            reportes: '/reportes',
            reservaciones: '/reservaciones',
            usuarios: '/usuarios',
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
        this.app.use( express.json( { limit: '100mb' } ) );
        this.app.use( mongoSanitize() );
        this.app.use( express.static( path.join( __dirname, '/uploads'  ) ) );
        this.app.use( express.static( path.join( __dirname, '/assets'  ) ) );
    }

    routes(){
        this.app.use( this.paths.atencionCliente, require( './routes/atencion-cliente.routes' ) );
        this.app.use( this.paths.atracciones, require( './routes/atracciones.routes' ) );
        this.app.use( this.paths.auth, require( './routes/auth.routes' ) );
        this.app.use( this.paths.comentarios, require( './routes/comentarios.routes' ) );
        this.app.use( this.paths.comidas, require( './routes/comidas.routes' ) );
        this.app.use( this.paths.emergencias, require( './routes/emergencias.routes' ) );
        this.app.use( this.paths.lugares, require( './routes/lugares.routes' ) );
        this.app.use( this.paths.pedidos, require( './routes/pedidos.routes' ) );
        this.app.use( this.paths.promociones, require( './routes/promociones.routes' ) );
        this.app.use( this.paths.reportes, require( './routes/reportes.routes' ) );
        this.app.use( this.paths.reservaciones, require( './routes/reservaciones.routes' ) );
        this.app.use( this.paths.usuarios, require( './routes/usuarios.routes' ) );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto:', this.port );
        } );
    }
}

module.exports = Server;