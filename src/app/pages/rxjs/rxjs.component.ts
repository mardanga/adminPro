import { Component, OnInit, OnDestroy } from '@angular/core';

// tslint:disable-next-line:import-blacklist
import { Observable, Subscriber, Subscription } from 'rxjs/Rx';
import { retry, map, filter } from 'rxjs/operators';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private observ: Subscription;

  constructor() {
    this.observ = this.regresaObservable()
    .pipe(
      // .retry(2)
    )
    .subscribe(
      msj => console.log('sub : ' + msj),
      err => console.error(err),
      () => console.log('Termino')
    );

   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.observ.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador++;


        const salida = {
          valor: contador
        };


        observer.next(salida);


        // if ( contador === 3 ) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio!');
        // }

      }, 1000 );

    }).pipe(
      map( resp => resp.valor),
      filter( ( valor, index ) => {
        if (  (valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );

  }


}
