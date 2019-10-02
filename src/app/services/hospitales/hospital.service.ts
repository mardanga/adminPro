import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';
declare var swal : any;

@Injectable()
export class HospitalService {
  
  constructor(private _http: Http, private _us: UsuarioService) { }

  obtenerHospitales(desde) {
    return this._http.get(environment.URL_SERVICIO + 'hospital?desde=' + desde)
    .map( (resp: any)=>{
      return resp.json();
    })
  }

  obtenerHospital(id:string) {
    return this._http.get(environment.URL_SERVICIO + 'hospital/' + id +"?token=" + this._us.token)
    .map( (resp: any)=>{
      return resp.json();
    })
  }

  crearHospital(nombre)
  {
    let hospital = new Hospital(nombre);
    return this._http.post(environment.URL_SERVICIO + 'hospital?token=' + this._us.token, hospital).map(
      (res : any) => {                
        swal("Hospital creado", hospital.nombre, "success" );
        return res.json();
      }
    );

  }

  buscarHospital(texto: string) {
    return this._http.get(environment.URL_SERVICIO + 'busqueda/hospital/' + texto)
    .map( (resp: any)=>{
      let rta = resp.json();
      return rta.data;
    })
  }

  actualizarHospital(hospital: Hospital)
  {
    return this._http.put(environment.URL_SERVICIO + 'hospital/' + hospital._id + '?token=' + this._us.token, hospital).map(
      (res : any) => {        
        
        swal("Hospital actualizado", hospital.nombre, "success" );
        return res.json();
      }
    );
  }

  borrarHospital(id: string)
  {
    return this._http.delete(environment.URL_SERVICIO + 'hospital/' + id + '?token=' + this._us.token).map(
      (res : any) => {        
        
        swal("Hospital eliminado", "", "success" );
        return res.json();
      }
    );

  }
}
