//Todo Isa
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Contenido, Noticia } from '../Interfaces/Contenido.interface';
import { ContenidoService } from '../contenido.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-main-page-contenido',
  templateUrl: './main-page-contenido.component.html',
  styleUrls: ['./main-page-contenido.component.scss']
})
export class MainPageContenidoComponent implements OnInit {

  puedeModificar: boolean = false;
  estaRegistrado: boolean = false;

  idBorrado: string;
  idModificar: string;
  mensaje: number;
  info: Noticia;
  p: number;
  qho:string;

  constructor(private ContenidoService: ContenidoService,
    private AuthService: AuthService,
    private SharedService: SharedService) {

    this.idBorrado = "";
    this.p = 1;
    this.qho="no";
    this.idModificar = "";
    this.mensaje = 0;
    this.info = {
      id: "0",
      titulo: "",
      subtitulo: "",
      fecha: new Date(),
      contenido: "",
      seccion: "",
      imagen: ""
    };
    const user = localStorage.getItem('user');
    if (user) {
      this.estaRegistrado = true;

      this.comprobarPuedeModificar();
    }

    this.SharedService.comprobarPermisos.subscribe(registrado => {
      this.estaRegistrado = registrado;

      this.comprobarPuedeModificar();
    });
  }

  ngOnInit() {
    this.ContenidoService.getListado().subscribe((res) => {});
  }


  get resultado() {

    return this.ContenidoService.resultado;
  }


  obtenerId(event: any) {
    let id = event.target.id;
    this.idBorrado = id.slice(1);
  }


  limpiarIdBorrado() {
    this.idBorrado = "";
  }


  obtenerNoticiaAEditar(event: any) {
    let id = event.target.id;
    this.idModificar = id.slice(1);
    this.ContenidoService.obtenerNoticia(this.idModificar).subscribe({
      next: data => {
        if (data.success !==false) {
          this.info = data.data;
        }
      },
      error: error => {
        this.qho="si";
      }
    });
  }

  comprobarPuedeModificar() {
    if (this.estaRegistrado) {
      this.AuthService.puedeModificar().subscribe(resp => {
        this.puedeModificar = (resp) ? true : false;
      });
    }
  }

}
