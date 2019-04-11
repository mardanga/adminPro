import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { environment } from './../../../environments/environment';
import { Usuario } from './../../models/usuario.model';
import 'rxjs/operators/map';
import swal from 'sweetalert'
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {
  
  usuario: Usuario;
  token: string;

  constructor(public _http: Http, public router: Router, private _sa: SubirArchivoService) {
    this.cargar();
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
        
        this.usuario = resp.usuario;
        this.token = resp.token;
        this.guardarStorage(this.usuario._id, this.token,this.usuario);
        return true;
      })
  }

  private guardarStorage(id, token, usuario) {
    localStorage.setItem("idUsuario", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
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

  cargar() {
    if(localStorage.getItem("usuario") != null) {    
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.token = localStorage.getItem("token");
    }
  }

  guardar(usuario: Usuario){
     return this._http.put(environment.URL_SERVICIO + 'usuario/' + usuario._id +"?token=" + this.token, usuario)
     .map( (resp:any) => {
        let usuarioDb= resp.json().usuario;
        this.guardarStorage(usuario._id, this.token, usuarioDb);
        swal("Usuario modificado", "","success" );
        return true;
      })
     
     ;
  }

  cambiarImagen(archivo: File) {
    this._sa.subirArchivo(archivo, 'usuario', this.usuario._id).then(
      (resp:any) => {
        this.usuario.img = resp.usuario.img;
        this.guardarStorage(this.usuario._id, this.token, this.usuario);
        
      }
    )
    ;
  }
}
