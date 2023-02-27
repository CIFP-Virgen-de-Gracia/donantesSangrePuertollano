import { Component, ViewChild, ElementRef } from '@angular/core';
import { Contenido } from '../Interfaces/Contenido.interface';
import { ContenidoService } from '../contenido.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-contenido',
  templateUrl: './add-contenido.component.html',
  styleUrls: ['./add-contenido.component.scss']
})
export class AddContenidoComponent {
  addConfig: AngularEditorConfig = {
    editable: true,
      height: '100px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      toolbarHiddenButtons: [ [ 'fontName','insertImage','insertVideo','insertHorizontalRule' ] ]
};
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
    this.foto.nativeElement.value = ''

  }
  comprobarExtension(file: any):boolean {
    let permitida = false;
    if (file != "") {
      let extensiones_permitidas = ['.PNG', ".JPG", '.png', '.jpg', '.jpeg', '.gif', '.tiff', '.svg', '.webp'];
      let extension = (file.name.substring(file.name.lastIndexOf("."))).toLowerCase();
      if (extension != "") {
        for (let i = 0; i < extensiones_permitidas.length && !permitida; i++) {
          if (extensiones_permitidas[i] == extension) {
            permitida = true;
          }
        }
      }
    } else {
      permitida = true;
    }
    return permitida;
  }
  agregarNoticia() {

    if (this.noticia.titulo.trim().length === 0 || this.noticia.contenido.trim().length === 0) {
      this.alert = "si";
    } else {
      if (!this.comprobarExtension(this.noticia.imagen)) {
        this.aviso = 3;
        console.log(this.aviso);
      } else {
        this.ContenidoService.añadirNoticia(this.noticia).subscribe((res) => {
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
}
