import { Component, Input, OnInit } from '@angular/core';
import { Contenido } from '../Interfaces/Contenido.interface';
import { ContenidoService } from '../contenido.service';

@Component({
  selector: 'app-main-page-contenido',
  templateUrl: './main-page-contenido.component.html',
  styleUrls: ['./main-page-contenido.component.scss']
})
export class MainPageContenidoComponent implements OnInit {


  constructor(private ContenidoService:ContenidoService){}
  p: number = 1;

  ngOnInit(){
    this.ContenidoService.getListado().subscribe((res)=>{
      console.log(res);
    });
  }
  get resultado() {
    return this.ContenidoService.resultado
  }

}
