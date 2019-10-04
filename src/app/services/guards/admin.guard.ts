import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private _us: UsuarioService){}

  canActivate()
   {
      if (this._us.usuario.role === "ADMIN_ROLE") {
        return true;
      }
      else {
        console.log('bloqueado por admin guard ');
        this._us.logout();        
        return false;
      }
  }
}
