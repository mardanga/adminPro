import { environment } from './../../../environments/environment';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  hospitales: any[] = [];
  usuarios: any[] = [];
  medicos: any[] = [];

  constructor(public _ar: ActivatedRoute, public _http: Http) {
    this._ar.params.subscribe(params => {
      this.buscar(params['termino']);
    })
   }

  ngOnInit() {
  }

  buscar (termino: string) {
    return this._http.get(environment.URL_SERVICIO + 'busqueda/todos/' + termino).pipe(
      map( (resp : any) => {
        let rta = resp.json();
      return rta;
      })
    ).subscribe( (rta : any) => {
      this.usuarios = rta.usuarios;
      this.hospitales = rta.hospitales;
      this.medicos = rta.medicos;
    });
  }
}
