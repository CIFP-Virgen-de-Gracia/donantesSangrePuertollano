import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { Contenido } from '../Interfaces/Contenido.interface';
import { ContenidoService } from '../contenido.service';

@Component({
  selector: 'app-editado',
  templateUrl: './editado.component.html',
  styleUrls: ['./editado.component.scss']
})
export class EditadoComponent {
  res: string = "no";
  alert: string = "no";
  aviso: number = 0;

  @Input() idModificar: string = "";

  @Input() infoNoticia: Contenido = {
    titulo: "",
    subtitulo: "",
    contenido: "",
    seccion: "",
    imagen: ""
  };
  img: string = this.infoNoticia.imagen;

  @ViewChild('imagen') foto!: ElementRef<HTMLInputElement>;

  constructor(private ContenidoService: ContenidoService) {
  }

  limpiarAlert() {
    this.alert = "no";
    this.aviso = 0;
  }
  capturarFile(event: any) {
    const files = event.target.files[0];
    this.infoNoticia.imagen = files;
  }
  limpiarContenido() {
    this.infoNoticia.titulo = "";
    this.infoNoticia.subtitulo = "";
    this.infoNoticia.contenido = "";
    this.infoNoticia.imagen = "";
    this.foto.nativeElement.value = ''
  }
  modificarNoticia() {

    if (this.infoNoticia.titulo.trim().length === 0 || this.infoNoticia.contenido.trim().length === 0) {
      this.alert = "si";
    } else {
      this.ContenidoService.editarNoticia(this.idModificar, this.infoNoticia).subscribe({
        next: data => {
          if (data !== "No se ha podido modificar") {
            console.log("Se ha editado");
            this.ContenidoService.editar(this.idModificar, data);
            this.limpiarContenido();
            this.aviso = 1
          }
        },
        error: error => {
          console.log("No se ha editado");
          console.log(error);
          this.aviso = 2;
        }
      });
    }
  }
}
