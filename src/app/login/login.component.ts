import { Usuario } from './../models/usuario.model';
import { Subscriber } from 'rxjs/Rx';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from './../services/services.index';

declare function initPlugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email =  "";
  auth2: any;
  
  constructor(private router: Router, public _us: UsuarioService) { }

  ngOnInit() {
    initPlugins();
    this.googleSignInInit();

    this.email = localStorage.getItem("email") || "";
    if (this.email) {
      this.recuerdame = true;
    }

  }

  ingresar( forma: NgForm) {
    //this.router.navigate(['/dashboard']);
    if(forma.invalid) {
      return; 
    }

    //login
    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._us.login(usuario, forma.value.recuerdame).subscribe(
      (res) => {
        this.router.navigate(['/dashboard']);
      }
    );
  }

  googleSignInInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '743582030731-r84206nq8crd356gicqc30pkj2kphfc5.apps.googleusercontent.com',
        scope: 'profile email',
        cookiepolicie: 'single_host_origin'
      });

      this.googleAttach(document.getElementById('btnGoogle'));
    });
  }

  googleAttach(elementHtml) {
    this.auth2.attachClickHandler(elementHtml, {}, (googleUSer : any) => {
      var profile = googleUSer.getBasicProfile();
      
      let token = googleUSer.getAuthResponse().id_token;
      console.log(token);
      
      this._us.loginGoogle(token).subscribe(
        res=> {
          console.log(res);
        }
      );
      
    });
  }
}
