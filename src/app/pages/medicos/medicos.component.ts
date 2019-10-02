import { MedicoService } from './../../services/medicos/medico.service';
import { Medico } from './../../models/medico.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  
  cargando = false;
  totalRegistros = 0;
  medicos: Medico[] = []
  desde = 0;
  
  constructor(private _ms: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedicos(text: string) {
    if(text.length < 1) {
      this.cargarMedicos();
      return;
    }

    this._ms.buscarMedico(text).subscribe((resp: any) => {
      this.medicos = resp;
    });
  }

  cargarMedicos() {
    this.cargando = true;
    this._ms.obtenerMedicos(this.desde).subscribe((resp: any) => {
      this.medicos = resp.medicos;
      this.totalRegistros = resp.total;      
      this.cargando = false;
    });
  }
 

  cargarSiguientes(valor: number) {
    let desde = this.desde + valor;
    if (desde < 0) {
      return;
    }
    if (desde > this.totalRegistros) {
     return;
   }
   this.desde = desde;
   this.cargarMedicos();
 } 

  borrarMedico(medico: Medico){
    this._ms.borrarMedico(medico._id).subscribe( (resp: any)=> {
      this.cargarMedicos();
    });;
  } 

  actualizarMedico(medico: Medico){
    this._ms.actualizarMedico(medico).subscribe();
  } 

}
