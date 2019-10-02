import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  constructor(public _us: UsuarioService, public _router: Router) { }

  ngOnInit() {
    this.usuario = this._us.usuario;
    //console.log(this.usuario);
  }


  buscar(termino: string) {
      this._router.navigate(['busqueda', termino]);
    
  }
}
