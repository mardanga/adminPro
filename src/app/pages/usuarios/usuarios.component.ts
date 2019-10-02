import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';

declare var swal : any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde : number = 0;
  totalRegistros : number = 0;
  cargando : boolean= true;

  constructor(private _us: UsuarioService) { }

  ngOnInit() {
     this.cargarUsuarios();
  }

  cargarUsuarios(){

    this.cargando = true;

    this._us.obtenerUsuarios(this.desde).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.totalRegistros = resp.total;      
      this.cargando = false;
         
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
  
    this.cargarUsuarios();
  
  
  } 

  buscarUsuario(termino) {
    

    if(termino < 1)
    {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._us.buscarUsuarios(termino).subscribe((resp: any) => {
      this.usuarios = resp;
      console.log(resp);
      
      this.totalRegistros = resp.length;      
      this.cargando = false;
    });
  }

  borrarUsuario(usuario:Usuario) {
        
    if(usuario._id === this._us.usuario._id) {
      swal("Error eliminacion","No se puede eliminar al usuario logueado", "error");
      return;
    }

    swal({
      title: 'Borrar usuario',
      text: 'seguro de eliminar al usuario ' + usuario.nombre +'?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
     
       if (willDelete) {
         this._us.eliminarUsuario(usuario).subscribe((resp: any) => {
           swal("Usuario eliminado", {
             icon: "success",
           });
           this.cargarUsuarios();
   });
        
       }
    });

    
  }

  guardarUsuario(usuario) {
    this._us.guardar(usuario).subscribe();
  }

}
