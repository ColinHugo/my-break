const generarUrlFotos = ( req, carpeta, documentos ) => {

    if ( Array.isArray( documentos ) ) {

        documentos.forEach( documento => {
            
            if ( Array.isArray( documento.foto ) ) {
                for ( let i = 0; i < documento.foto.length; i++ ) {
                    documento.foto[ i ] = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documento.foto[ i ] }`;
                }
            } else {
                if ( documento.foto ) {
                    documento.foto = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documento.foto }`;
                } else {
                    documento.foto = `${ req.protocol }://${ req.headers.host }/no-image.jpg`;
                }
            }
        } );
    } else {
        if ( documentos.foto ) {
            documentos.foto = `${ req.protocol }://${ req.headers.host }/${ carpeta }/${ documentos.foto }`;
        } else {
            documentos.foto = `${ req.protocol }://${ req.headers.host }/no-image.jpg`;
        }
    }

    return documentos;
}

module.exports = generarUrlFotos;