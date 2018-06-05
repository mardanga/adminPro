import { Component, OnInit, Input, Output, EventEmitter, ViewChild,ElementRef } from '@angular/core';



@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;
  @Input() progreso: number = 50;
  @Input() leyenda: string = 'Leyenda';

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ingresoValor(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.cambioValor.emit(this.progreso);
    this.txtProgreso.nativeElement.value = this.progreso;
  }

  cambiarValor(valor:  number) {

    if ((this.progreso + valor) >= 100) {
      this.progreso = 100;
      return;
    }

    if ((this.progreso + valor) <= 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    this.cambioValor.emit(this.progreso);
  }


}
