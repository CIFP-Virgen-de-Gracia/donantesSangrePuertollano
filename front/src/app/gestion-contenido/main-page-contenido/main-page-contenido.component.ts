import { Component, Input, OnInit } from '@angular/core';
import { Contenido } from '../Interfaces/Contenido.interface';
import { ContenidoService } from '../contenido.service';

@Component({
  selector: 'app-main-page-contenido',
  templateUrl: './main-page-contenido.component.html',
  styleUrls: ['./main-page-contenido.component.scss']
})
export class MainPageContenidoComponent implements OnInit {

  contenido:any=this.ContenidoService.noticias;
  constructor(private ContenidoService:ContenidoService){}

  ngOnInit(){
    this.ContenidoService.getListado().subscribe((res)=>{
      this.contenido=res;
    });
  }


}
