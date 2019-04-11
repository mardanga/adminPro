import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';


@Injectable()
export class SubirArchivoService {

  constructor() { }


  subirArchivo( archivo: File, tipo: string, id: string ) {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append( 'imagen', archivo, archivo.name );

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log('Subida')
            resolve( JSON.parse(xhr.response)  );
          } else {
            console.log('falla')
            reject( xhr.response );
          }

        }
      };

      let url = environment.URL_SERVICIO + 'upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true );
      xhr.send( formData );

    });




  }

}
