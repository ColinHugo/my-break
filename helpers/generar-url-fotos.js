const generarUrlFotos = ( req, carpeta, documentos ) => {

    if ( Array.isArray( documentos ) ) {

        documentos.forEach( documento => {
            
            if ( Array.isArray( documento.foto ) ) {
                for ( let i = 0; i < documento.foto.length; i++ ) {
                    documento.foto[ i ] = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documento.foto[ i ] }`;
                }
            } else {
                documento.foto = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documento.foto }`;
            }
        } );
    } else {
        documentos.foto = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documentos.foto }`;
    }

    return documentos;
}

export default generarUrlFotos;