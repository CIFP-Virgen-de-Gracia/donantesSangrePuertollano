import { Component, OnInit } from '@angular/core';
import { PaginasService } from '../services/paginas.service';
import { Integrante } from '../interfaces/Paginas.interfaces';


@Component({
  selector: 'app-la-hermandad',
  templateUrl: './la-hermandad.component.html',
  styleUrls: ['./la-hermandad.component.scss']
})
export class LaHermandadComponent implements OnInit {

  junta:Array<Integrante> | undefined;

  constructor(private PaginasService: PaginasService){}

  ngOnInit(){
    this.PaginasService.getIntegrantesCargo()
      .subscribe( resp =>{
        this.junta = resp;
      });
  }
}
