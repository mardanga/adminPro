


import { Router, ActivationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';



@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string = '';
  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.crearObservable().subscribe(
      (data: any) => {
        console.log(data);
        this.titulo = data.titulo;
        this.title.setTitle(this.title.getTitle() + ' - ' + this.titulo );
        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.titulo
        } ;
        this.meta.updateTag(metaTag);
      }

    );
   }

  ngOnInit() {
  }

  crearObservable() {
   return this.router.events.pipe(
    filter( evento => evento instanceof ActivationEnd),
    filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
    map( data => data.snapshot.data )
   );
  }

}
