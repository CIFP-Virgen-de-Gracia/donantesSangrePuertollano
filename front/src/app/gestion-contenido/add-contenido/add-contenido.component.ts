import { Component, Input, Output } from '@angular/core';
import { Contenido } from '../Interfaces/Contenido.interface';
import { ContenidoService } from '../contenido.service';

@Component({
  selector: 'app-add-contenido',
  templateUrl: './add-contenido.component.html',
  styleUrls: ['./add-contenido.component.scss']
})
export class AddContenidoComponent {
  res: string = "no";
  alert: string = "no";
  aviso: number = 0
  noticia: Contenido = {
    titulo: "",
    subtitulo: "",
    contenido: "",
    seccion: "noticias",
    imagen: []
  }

  constructor(private ContenidoService: ContenidoService) {
  }

  limpiarAlert(){
    this.alert = "no";
    this.aviso=0;
  }
  capturarFile(event: any): any {
    const files = event.target.files;
    this.noticia.imagen = files;
  }
  limpiarContenido(){
    this.noticia.titulo="";
    this.noticia.subtitulo="";
    this.noticia.contenido="";
    this.noticia.imagen="";
  }
  agregarNoticia() {
    console.log("Enviando en formulario");
    if (this.noticia.titulo.trim().length === 0 || this.noticia.contenido.trim().length === 0) {
      this.alert = "si";
    } else {
      this.ContenidoService.añadirNoticia(this.noticia).subscribe((res) => {
        if (res === 1) {
          this.aviso = 1;
          this.ContenidoService.getListado().subscribe();
          this.limpiarContenido();
        } else {
          this.aviso = 2;
        }
      });
    }
  }
}
