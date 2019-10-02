import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';


declare var swal : any;

@Injectable()
export class MedicoService {
  

  constructor(private _http: Http, private _us: UsuarioService) { }

  buscarMedico(text: string) {
    return this._http.get(environment.URL_SERVICIO + 'busqueda/coleccion/medicos/' + text)
    .map( (resp: any)=>{
      let rta = resp.json();
      return rta.data;
    })
  }

  obtenerMedicos(desde: number) {
    return this._http.get(environment.URL_SERVICIO + 'medico?desde=' + desde)
    .map( (resp: any)=>{
      return resp.json();
    })

  }
  
  borrarMedico(_id: any) {
    return this._http.delete(environment.URL_SERVICIO + 'medico/' + _id + '?token=' + this._us.token).map(
      (res : any) => {        
        swal("Medico eliminado", "", "success" );
        return res.json();
      }
    );
  }
  
  actualizarMedico(medico: Medico) {

        return this._http.put(environment.URL_SERVICIO + 'medico/' + medico._id + '?token=' + this._us.token, medico).map(
      (res : any) => {        
        
        swal("Medico actualizado", medico.nombre, "success" );
        return res.json();
      }
    );
  }

  guardarMedico(medico: Medico) {
    
    
    if(medico._id)
    {
      return this._http.put(environment.URL_SERVICIO + 'medico/'+ medico._id + '?token=' + this._us.token,medico).map(
        (res : any) => {
          swal("Medico actualizado", medico.nombre, "success");
          return res.json();
        }
      );  
    }
    else{
      return this._http.post(environment.URL_SERVICIO + 'medico?token=' + this._us.token,medico).map(
      (res : any) => {
        swal("Medico creado", medico.nombre, "success");
        return res.json();
      }
      );
    }
  }

  obtenerMedico(id:string) {
    return this._http.get(environment.URL_SERVICIO + 'medico/' + id +"?token=" + this._us.token)
    .map( (resp: any)=>{
      return resp.json();
    })
  }
}
