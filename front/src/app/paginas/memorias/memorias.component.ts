import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Memoria, MemoriaAddUpdate } from '../interfaces/paginas.interface';
import { PaginasService } from '../services/paginas.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { entradaSalidaVentana } from 'src/app/shared/animaciones/animaciones';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-memorias',
  templateUrl: './memorias.component.html',
  styleUrls: ['./memorias.component.scss'],
  animations: [ entradaSalidaVentana ]
})
export class MemoriasComponent implements OnInit {

  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('inptImg') inptImg!: ElementRef;
  @ViewChild('inptDoc') inptDoc!: ElementRef;

  timer: NodeJS.Timeout | undefined;
  codAccion: number = -1;
  codDescarga: number = -1;
  accion: string = '';
  imagenValida: boolean = true;
  documentoValido: boolean = true;
  estaRegistrado: boolean = false;
  puedeModificar: boolean = false;
  infoMemoria!: MemoriaAddUpdate;
  memorias: Memoria[] = [];

  constructor(
    private PaginasService: PaginasService,
    private AuthService: AuthService
  ) {
    this.limpiarMemoria();
  }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.estaRegistrado = true;

      this.comprobarPuedeModificar();
    }

    this.PaginasService.getMemorias()
      .subscribe(resp => {

        if (resp.success) {
          this.memorias = resp.data;
        }
      });
  }


  setInfoMemoria(index: number) {
    const memoria = this.memorias[index];

    this.limpiarMemoria();
    this.infoMemoria = {
      id: memoria.id,
      anio: memoria.anio,
      imagen: new File([""], memoria.imagen),
      documento: new File([""], memoria.documento)
    }
  }


  onImgSeleccionada(event: Event) {
    const permitidas = ['.png', '.jpg', '.jpeg', '.gif', '.tiff', '.svg', '.webp'];
    const img = ((event.target as HTMLInputElement).files as FileList)[0];

    if (this.comprobarExtension(img, permitidas)) {
      if (this.infoMemoria.imagen) {

        const nombre = this.infoMemoria.imagen.name;
        this.infoMemoria.imgBorrar = nombre.substring(nombre.lastIndexOf("/") + 1);
      }

      this.infoMemoria.imagen = img;

    } else this.imagenValida = false;
  }


  onDocumentoSeleccionado(event: Event) {
    const permitidas = ['.pdf', '.odt', '.doc', '.docx'];
    const documento = ((event.target as HTMLInputElement).files as FileList)[0];

    if (this.comprobarExtension(documento, permitidas)) {
      if (this.infoMemoria.documento) {

        const nombre = this.infoMemoria.documento.name;
        this.infoMemoria.docBorrar = nombre.substring(nombre.lastIndexOf("/") + 1);
      }

      this.infoMemoria.documento = documento;

    } else this.documentoValido = false;
  }


  comprobarExtension(file: File, permitidas: string[]) {
    const extension = (file.name.substring(file.name.lastIndexOf("."))).toLowerCase();

    return (permitidas.includes(extension)) ? true : false;
  }


  addOrUpdateMemoria() {
    this.PaginasService.addOrUpdateMemoria(this.infoMemoria)
      .subscribe( resp => {

        if (resp.success) {
          this.codAccion = 0;
          let index = this.memorias.findIndex(m => m.id == resp.data.id);

          if (index == -1) this.memorias.push(resp.data)
          else this.memorias[index] = resp.data;

        } else this.codAccion = 1;

        this.setTimer(4000);
      })

    this.closeModal.nativeElement.click();
    this.limpiarMemoria();
  }


  borrarMemoria(index: number) {
    this.PaginasService.borrarMemoria(this.memorias[index].id)
      .subscribe(resp => {

        if (resp.success) {
          this.memorias.splice(index, 1);
          this.codAccion = 0;

        } else {
          this.codAccion = 1;
        }

        this.setTimer(4000);
      });
  }


  descargarArchivo(archivo: string) {
    const nombre = archivo.substring(archivo.lastIndexOf("/") + 1);

    this.PaginasService.descargarArchivo(nombre)
      .subscribe({
        next: resp => {
          saveAs(resp, nombre);
        },
        error: error => {
          this.accion = 'descargar';
          this.codAccion = 1;
        }
      });
  }


  limpiarMemoria() {
    this.infoMemoria = { id: -1, anio: new Date().getFullYear(), imagen: null, documento: null };
    if (this.inptImg) this.inptImg.nativeElement.value = '';
    if (this.inptDoc) this.inptDoc.nativeElement.value = '';
  }


  setTimer(tiempo: number) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.codAccion = -1, tiempo);
  }


  irA(url: string){
    if (url != null) window.open(url, "_blank");
  }


  comprobarPuedeModificar() {
    if (this.estaRegistrado) {
      this.AuthService.puedeModificar().subscribe(resp => {
        this.puedeModificar = (resp) ? true : false;
      });
    }
  }
}

