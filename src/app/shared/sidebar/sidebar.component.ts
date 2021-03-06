import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  constructor( public _sidebar: SidebarService, public _us: UsuarioService ) {
    this.usuario = _us.usuario;
    _sidebar.cargarMenu();
   }


  ngOnInit() {
  }

  
}
