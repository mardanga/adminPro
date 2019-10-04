import { Component, OnInit } from '@angular/core';

declare function initPlugins();

@Component({
  selector: 'app-notpagefound',
  templateUrl: './notpagefound.component.html',
  styles: []
})
export class NotpagefoundComponent implements OnInit {

  anio: number;
  constructor() { 
    this.anio = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
