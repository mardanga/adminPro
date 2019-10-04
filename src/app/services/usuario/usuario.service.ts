import { Observable } from 'rxjs/Rx';
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
  menu : any[] = [];

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
        console.log(resp);
        
        this.usuario = resp.usuario;
        this.token = resp.token;
        this.menu = resp.menu;
        this.guardarStorage(this.usuario._id, this.token,this.usuario, this.menu);
        return true;
      })   .catch( err => {

        swal( 'Error en el login', err.error.mensaje, 'error' );
        return Observable.throw( err );
      });
  }

  private guardarStorage(id, token, usuario, menu) {
    localStorage.setItem("idUsuario", id);
    localStorage.setItem("tokenAdminPro", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));
  }

  loginGoogle(token: string) {
    return this._http.post(environment.URL_SERVICIO + 'login/google', {token});
  }
  
  logout () {

      localStorage.removeItem("idUsuario");
      localStorage.removeItem("tokenAdminPro");
      localStorage.removeItem("usuario");
      localStorage.removeItem("menu");
      
      this.router.navigate(['/login']);
  }

  estaLogueado() {
    
    return localStorage.getItem("tokenAdminPro") && localStorage.getItem("tokenAdminPro").length > 5;
  }

  cargar() {
    if(localStorage.getItem("usuario") != null) {    
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.token = localStorage.getItem("tokenAdminPro");
      this.menu = JSON.parse(localStorage.getItem("menu"));
    }
  }

  guardar(usuario: Usuario){
    
     return this._http.put(environment.URL_SERVICIO + 'usuario/' + usuario._id +"?token=" + this.token, usuario)
     .map( (resp:any) => {
        
        if(usuario._id === this.usuario._id) {
          let usuarioDb: Usuario= resp.json().usuario;
          this.guardarStorage(usuario._id, this.token, usuarioDb, this.menu);
        }
        swal("Usuario modificado", "","success" );
        return true;
      })  .catch( err => {
        swal( err.error.mensaje, err.error.errors.message, 'error' );
        return Observable.throw( err );
      });
     
     ;
  }

  cambiarImagen(archivo: File) {
    this._sa.subirArchivo(archivo, 'usuario', this.usuario._id).then(
      (resp:any) => {
        this.usuario.img = resp.usuario.img;
        this.guardarStorage(this.usuario._id, this.token, this.usuario, this.menu);
        
      }
    );
  }

  obtenerUsuarios(idRegistro: number) {
    return this._http.get(environment.URL_SERVICIO + 'usuario?desde=' + idRegistro)
    .map( (resp: any)=>{
      return resp.json();
    })
    
  }

  buscarUsuarios(texto: string) {
    return this._http.get(environment.URL_SERVICIO + 'busqueda/coleccion/usuarios/' + texto)
    .map( (resp: any)=>{
      let rta = resp.json();
      console.log(rta.data);
      return rta.data;
    })
    
  }

  eliminarUsuario(usuario: Usuario) {
    return this._http.delete(environment.URL_SERVICIO + 'usuario/'  + usuario._id +"?token=" + this.token);
    
  }
}
