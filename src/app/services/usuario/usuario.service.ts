import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from './../../../environments/environment';
import { Usuario } from './../../models/usuario.model';
import 'rxjs/operators/map';
import swal from 'sweetalert'

@Injectable()
export class UsuarioService {
  

  constructor(public _http: Http, public router: Router) {
   }

  crearUsuario (usuario: Usuario)
  {
    return this._http.post(environment.URL_SERVICIO + 'usuario', usuario).map(
      (res : any) => {
        swal("Usuario creado", usuario.email, "success" );
      }
    );

  }

  login(usuario: Usuario, recuerdame: boolean = false) {

    if(recuerdame) {
      localStorage.setItem("email", usuario.email);
    }
    else {
      localStorage.removeItem("email");
    }

    return this._http.post(environment.URL_SERVICIO + 'login', usuario)
      .map((resp: any) => {
        resp = resp.json();
        localStorage.setItem("idUsuario", resp.id);
        localStorage.setItem("token", resp.token);
        localStorage.setItem("usuario", JSON.stringify(resp.usuario));
        return true;
      })
  }

  loginGoogle(token: string) {
    return this._http.post(environment.URL_SERVICIO + 'login/google', {token});
  }
  
  logout () {

      localStorage.removeItem("idUsuario");
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      
      this.router.navigate(['/login']);
  }

  estaLogueado() {
    
    return localStorage.getItem("token") && localStorage.getItem("token").length > 5;
  }
}
