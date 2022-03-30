const generarUrlFotos = ( req, carpeta, documentos ) => {

    documentos.forEach( documento => {

        for ( let i = 0; i < documento.foto.length; i++ ) {
            documento.foto[ i ] = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documento.foto[ i ] }`;
        }
    } );

    return documentos;
}

export default generarUrlFotos;