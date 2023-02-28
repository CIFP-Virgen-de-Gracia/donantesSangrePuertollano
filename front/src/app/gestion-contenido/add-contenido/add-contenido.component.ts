import { Component, ViewChild, ElementRef } from '@angular/core';
import { Contenido } from '../Interfaces/Contenido.interface';
import { ContenidoService } from '../contenido.service';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
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
    imagen: ""
  }

  @ViewChild('imagen') foto!: ElementRef<HTMLInputElement>;

  constructor(private ContenidoService: ContenidoService) {}

  get resultado() {
    return this.ContenidoService.resultado
  }


  limpiarAlert() {
    this.alert = "no";
    this.aviso = 0;
  }


  capturarFile(event: any): any {
    const files = event.target.files[0];
    this.noticia.imagen = files;
  }


  limpiarContenido() {
    this.noticia.titulo = "";
    this.noticia.subtitulo = "";
    this.noticia.contenido = "";
    this.noticia.imagen = "";
    this.foto.nativeElement.value = ''

  }


  agregarNoticia() {
    if (this.noticia.titulo.trim().length === 0 || this.noticia.contenido.trim().length === 0) {
      this.alert = "si";

    } else {
      this.ContenidoService.añadirNoticia(this.noticia).subscribe((res) => {
        console.log(res)
        if (res !== "Error de registro") {
          this.aviso = 1;
          this.ContenidoService.agregar(res);
          this.limpiarContenido();

        } else {
          this.aviso = 2;
        }
      });
    }

  }
}
