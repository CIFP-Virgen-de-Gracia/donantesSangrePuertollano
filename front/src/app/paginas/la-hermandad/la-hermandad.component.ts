import { Component, OnInit } from '@angular/core';
import { PaginasService } from '../services/paginas.service';
import { Integrante } from '../interfaces/Paginas.interfaces';


@Component({
  selector: 'app-la-hermandad',
  templateUrl: './la-hermandad.component.html',
  styleUrls: ['./la-hermandad.component.scss']
})
export class LaHermandadComponent implements OnInit {

  junta:Integrante[]  | undefined;
  integrante: Integrante | undefined;


  constructor(private PaginasService: PaginasService){}

  ngOnInit(){
    this.PaginasService.getIntegrantesCargo()
      .subscribe( resp => {
        if (resp.success) {

          resp.data.map((i: Integrante | undefined) => this.integrante = i);
          this.junta = resp.data;

        } else {
          this.junta = undefined;
        }
      });
  }
}
