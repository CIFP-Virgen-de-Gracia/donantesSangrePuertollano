import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Memoria, MemoriaUpdate } from '../interfaces/paginas.interface';
import { PaginasService } from '../services/paginas.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { entradaSalidaVentana } from 'src/app/shared/animaciones/animaciones';

export const tiempoAnimacion = 250;

@Component({
  selector: 'app-memorias',
  templateUrl: './memorias.component.html',
  styleUrls: ['./memorias.component.scss'],
  animations: [ entradaSalidaVentana ]
})
export class MemoriasComponent implements OnInit {

  @ViewChild('closeModal') closeModal!: ElementRef;
  timer: NodeJS.Timeout | undefined;
  codBorrar: number = -1;
  codEditar: number = -1;
  imagenValida: boolean = true;
  documentoValido: boolean = true;
  infoMemoriaEditar: MemoriaUpdate;
  estaRegistrado: boolean = false;
  puedeModificar: boolean = false;
  memorias: Memoria[] = [];

  constructor(
    private PaginasService: PaginasService,
    private AuthService: AuthService
  ) {
    this.infoMemoriaEditar = this.limpiarMemoria();
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


  get memoriaEditar() {
    return this.infoMemoriaEditar;
  }


  get nombreImgMemEditar() {
    const nombre = this.infoMemoriaEditar.imagen.name.substring(this.infoMemoriaEditar.imagen.name.lastIndexOf("/") + 1);

    return nombre == 'null' ? 'No se ha seleccionado ningún archivo.' : nombre;
  }


  get nombreDocMemEditar() {
    return this.infoMemoriaEditar.documento.name.substring(this.infoMemoriaEditar.documento.name.lastIndexOf("/") + 1);
  }


  setMemoriaEditar(index: number) {
    this.limpiarMemoria();
    const memoria = this.memorias[index];

    this.infoMemoriaEditar = {
      id: memoria.id,
      anio: memoria.anio,
      imagen: new File([""], memoria.imagen),
      documento: new File([""], memoria.documento)
    }
  }


  onImgSeleccionada(event: Event) {
    const permitidas = ['.png', '.jpg', '.jpeg', '.gif', '.tiff', '.svg', '.webp'];
    const img = ((event.target as HTMLInputElement).files as FileList)[0];

    if (this.comprobarExtension(img, permitidas)) this.infoMemoriaEditar.imagen = img;
    else this.imagenValida = false;
  }


  onDocumentoSeleccionado(event: Event) {
    const permitidas = ['.pdf', '.odt', '.doc', '.docx'];
    const documento = ((event.target as HTMLInputElement).files as FileList)[0];

    if (this.comprobarExtension(documento, permitidas)) this.infoMemoriaEditar.documento = documento;
    else this.documentoValido = false;
  }


  comprobarExtension(file: File, permitidas: string[]) {
    const extension = (file.name.substring(file.name.lastIndexOf("."))).toLowerCase();

    return (permitidas.includes(extension)) ? true : false;
  }


  editarMemoria() {
    this.PaginasService.updateMemoria(this.infoMemoriaEditar)
      .subscribe( resp => {
        this.codEditar = resp.success ? 0 : 1;

        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.codEditar = -1, 5000);
      })

    this.closeModal.nativeElement.click()
    this.infoMemoriaEditar = this.limpiarMemoria();
  }


  borrarMemoria(index: number) {
    this.PaginasService.borrarMemoria(this.memorias[index].id)
      .subscribe(resp => {

        if (resp.success) {
          this.memorias.splice(index, 1);
          this.codBorrar = 0;

        } else {
          this.codBorrar = 1;
        }

        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.codBorrar = -1, 5000);
      });
  }


  limpiarMemoria() {
    return { id: -1, anio: -1, imagen: new File([""], ""), documento: new File([""], "") };
  }


  comprobarPuedeModificar() {
    if (this.estaRegistrado) {
      this.AuthService.puedeModificar().subscribe(resp => {
        this.puedeModificar = (resp) ? true : false;
      });
    }
  }
}
