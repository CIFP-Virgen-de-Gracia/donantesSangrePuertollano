import { Component, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Contenido, Noticia } from '../Interfaces/Contenido.interface';
import { ContenidoService } from '../contenido.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-editado',
  templateUrl: './editado.component.html',
  styleUrls: ['./editado.component.scss']
})
export class EditadoComponent {
  editConfig: AngularEditorConfig = {
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
    toolbarHiddenButtons: [['fontName', 'insertImage', 'insertVideo', 'insertHorizontalRule']]
  };

  res: string;
  alert: string;
  aviso: number;
  correcto: boolean;

  @Input() idModificar: string;
  @Input() infoNoticia: Noticia;

  @ViewChild('imagen') foto!: ElementRef<HTMLInputElement>;

  constructor(private ContenidoService: ContenidoService) {
    this.res = "no";
    this.alert = "no";
    this.aviso = 0;
    this.correcto = true;
    this.idModificar = "";
    this.infoNoticia = {
      id: 0,
      titulo: "",
      subtitulo: "",
      contenido: "",
      seccion: "",
      imagen: ""
    };
  }
  mostrarImagen() {
    let avisoImagen = 0;
    if (Object.prototype.toString.call(this.infoNoticia.imagen) === '[object String]') {
      if (this.infoNoticia.imagen === "") {
        avisoImagen = 1;
      } else {
        avisoImagen = 2;
      }
    }
    return avisoImagen;
  }
  limpiarAlert() {
    this.alert = "no";
    this.aviso = 0;
  }
  capturarFile(event: any) {
    const files = event.target.files[0];
    this.infoNoticia.imagen = files;
    console.log(this.comprobarExtension(files));
    if (!this.comprobarExtension(files)) {
      this.aviso = 3;
    }
  }
  comprobarExtension(file: any): boolean {
    let permitida = false;
    this.correcto = false;
    let extensiones_permitidas = ['.PNG', ".JPG", '.png', '.jpg', '.jpeg', '.gif', '.tiff', '.svg', '.webp'];
    let extension = (file.name.substring(file.name.lastIndexOf("."))).toLowerCase();
    if (extension != "") {
      for (let i = 0; i < extensiones_permitidas.length && !permitida; i++) {
        if (extensiones_permitidas[i] == extension) {
          permitida = true;
          this.correcto = true;
        }
      }
    }
    return permitida;
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
    } else if (!this.correcto) {
      this.aviso = 3;
    } else {
      this.ContenidoService.editarNoticia(this.idModificar, this.infoNoticia).subscribe({
        next: data => {
          if (data !== "No se ha podido modificar") {
            console.log(data);
            this.ContenidoService.editar(this.idModificar, data);
            this.limpiarContenido();
            this.aviso = 1;
          }
        },
        error: error => {
          this.aviso = 2;
        }
      });
    }
  }
}

