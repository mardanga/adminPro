import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  subirImagen: File;
  imagenTemporal: any;
  constructor(private _us: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._us.usuario;
  }


  guardar(){
    this._us.guardar(this.usuario).subscribe();
  }

  seleccionarImagen(file:File) {
    if(!file){
      this.subirImagen = null;
      return;
    }
    
    if(file.type.indexOf('image') < 0) {
      this.subirImagen = null;
      swal("Solo es posible seleccinar imágenes", "", "error");
      return;
    }
    
    this.subirImagen = file;
    let reader = new FileReader();
    let utrlImagenTemporal = reader.readAsDataURL(file);
    reader.onloadend = ()=> {
      this.imagenTemporal = reader.result; 
    };
      


    
  }

  cambiarImagen() {
    this._us.cambiarImagen(this.subirImagen);
    
  }
}
