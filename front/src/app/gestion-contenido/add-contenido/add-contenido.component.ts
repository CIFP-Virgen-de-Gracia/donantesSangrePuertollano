import { Component } from '@angular/core';
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
    imagen:""
  }
  /*
  noticiasForm: FormGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    subtitulo: new FormControl(''),
    contenido: new FormControl('', [Validators.required]),
    imagen: new FormControl(''),
    fileSource: new FormControl(''),
    seccion: new FormControl('noticias'),
  });*/

  constructor(private ContenidoService: ContenidoService) {
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
  }
  get resultado() {
    return this.ContenidoService.resultado
  }
  agregarNoticia() {
    /*const payload = new FormData();
    payload.append('titulo', this.noticiasForm.get('titulo')?.value);
    payload.append('subtitulo', this.noticiasForm.get('subtitulo')?.value);
    payload.append('contenido', this.noticiasForm.get('contenido')?.value);
    payload.append('seccion', this.noticiasForm.get('seccion')?.value);
    payload.append('imagen',this.noticiasForm.get('fileSource')?.value);*/

    if (this.noticia.titulo.trim().length === 0 || this.noticia.contenido.trim().length === 0) {
      this.alert = "si";
    } else {
      this.ContenidoService.añadirNoticia(this.noticia).subscribe((res) => {
        if (res!=="Error de registro") {
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
