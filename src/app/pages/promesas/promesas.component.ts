import { Component } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent  {

  constructor() {

    this.creaPromesa().then(
      msg => console.log('Todo bien', msg)
    ).catch(
      (err) => console.error('Error', err)
    );
  }

  creaPromesa (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador = contador + 1;
      
        if (contador === 3) {
          resolve(true);
            clearInterval(intervalo);
        }

/*

        if (contador === 8) {
          reject("Error");
        }
*/
      }, 1000);

    });

  }
}
