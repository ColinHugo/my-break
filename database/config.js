import mongoose from 'mongoose'

const dbConnection = async() => {

    try {

        const db = await mongoose.connect( process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } );

        const url = `${ db.connection.host }:${ db.connection.port }`;

        console.log( 'Mongo DB conectado en:', url );
    }

    catch ( error ) {
        console.error( 'Error al conectar a la base de datos:', error );
        throw new Error( 'Error a la hora de iniciar la base de datos' );
    }
}

export default dbConnection;