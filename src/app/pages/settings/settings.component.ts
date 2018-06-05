import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private document, private _ss: SettingsService) { }

  ngOnInit() {
  }

cambiarTema(tema: string, link: any) {
  this.aplicarCheck(link);
  this._ss.aplicarTema(tema);
}

aplicarCheck(link: any) {

  const selectores = this.document.getElementsByClassName('selector');

  for (const element of selectores) {
    element.classList.remove('working');
  }

  link.classList.add('working');
}

}
