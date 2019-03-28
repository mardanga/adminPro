import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(public _us: UsuarioService, public router: Router) {
   
  }

  
  canActivate(){         
    if(this._us.estaLogueado()) {
      console.log('Paso el guard');
      return true;
    }
    else {
      console.log('bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }
    
  }
}
