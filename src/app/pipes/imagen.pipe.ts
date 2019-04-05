import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    
    

    let url = environment.URL_SERVICIO + 'img/';

    if ( !img ) {
      return url + 'usuario/user.png';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'usuario':
        url += 'usuario/' + img;
      break;

      case 'medico':
        url += 'medicos/' + img;
      break;

      case 'hospital':
         url += 'medicos/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += 'usurio/user.png';
    }

    return url;
  }

}
