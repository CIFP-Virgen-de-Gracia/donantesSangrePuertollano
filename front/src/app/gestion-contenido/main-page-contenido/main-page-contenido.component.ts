import { Component, Input, OnInit } from '@angular/core';
import { Contenido,Noticia } from '../Interfaces/Contenido.interface';
import { ContenidoService } from '../contenido.service';

@Component({
  selector: 'app-main-page-contenido',
  templateUrl: './main-page-contenido.component.html',
  styleUrls: ['./main-page-contenido.component.scss']
})
export class MainPageContenidoComponent implements OnInit {

  constructor(private ContenidoService: ContenidoService) { }
  p: number = 1;
  idBorrado: string = "";
  idModificar = "";
  mensaje: number = 0;
  info: Noticia = {
    id:0,
    titulo: "",
    subtitulo: "",
    contenido: "",
    seccion: "",
    imagen: ""
  };

  ngOnInit() {
    this.ContenidoService.getListado().subscribe((res) => {});
  }
  get resultado() {

    return this.ContenidoService.resultado
  }
  obtenerId(event: any) {
    let id = event.target.id;
    this.idBorrado = id.slice(1);
    console.log(this.idBorrado);
  }
  limpiarIdBorrado() {
    this.idBorrado = "";
  }

  obtenerNoticiaAEditar(event: any) {
    let id = event.target.id;
    this.idModificar = id.slice(1);
    this.ContenidoService.obtenerNoticia(this.idModificar).subscribe({
      next: data => {
        if (data !== "No encontrada") {
          this.info = data;
          console.log(this.info);
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
