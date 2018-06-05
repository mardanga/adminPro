import { Injectable, Inject } from '@angular/core';
import { IAjustes } from '../../interfaces/IAjustes';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: IAjustes = {
    tema: 'default',
    url: 'assets/css/color/default.css'
  };

  constructor(@Inject(DOCUMENT) private document) {
    this.cargar();

   }

guardar() {
  localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
}

cargar() {
  if (localStorage.getItem('ajustes')) {
    this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
  }
  this.aplicarTema(this.ajustes.tema);
}

aplicarTema (tema) {
  const url = 'assets/css/colors/' + tema + '.css';

  this.document.getElementById('theme').setAttribute('href', url);
  this.ajustes.tema = tema;
  this.ajustes.url = url;
  this.guardar();
}

}
