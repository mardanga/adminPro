import { HospitalService } from './../../services/hospitales/hospital.service';
import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
declare var swal : any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  cargando = false;
  totalRegistros = 0;
  hospitales: Hospital[] = []
  desde = 0;

  constructor(private _hs: HospitalService) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  buscarHospital(text: string) {
    if(text.length < 1) {
      this.cargarHospitales();
      return;
    }

    this._hs.buscarHospital(text).subscribe((resp: any) => {
      this.hospitales = resp;
      
    });
  }

  cargarHospitales(){

    this.cargando = true;

    this._hs.obtenerHospitales(this.desde).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.total;      
      this.cargando = false;
         
    });
  }

  crearHospital(){
    swal("Introduzca el nombre del hospital:", {
      content: "input",
    })
    .then((value) => {
      this._hs.crearHospital(value).subscribe( (resp: any)=> {
        this.cargarHospitales();
      });
    });
  }

  cargarSiguientes(valor: number){
    let desde = this.desde + valor;
    if (desde < 0) {
      return;
    }
    if (desde > this.totalRegistros) {
     return;
   }
   this.desde = desde;
   this.cargarHospitales();
 } 

  borrarHospital(hosp: Hospital){
    this._hs.borrarHospital(hosp._id).subscribe( (resp: any)=> {
      this.cargarHospitales();
    });;
  } 

  actualizarHospital(hosp: Hospital){
    this._hs.actualizarHospital(hosp).subscribe();
  } 
}


