import { Component, Input } from '@angular/core';
import { ContenidoService } from '../contenido.service';
@Component({
  selector: 'app-borrar',
  templateUrl: './borrar.component.html',
  styleUrls: ['./borrar.component.scss']
})
export class BorrarComponent {

  @Input() idBorrado: string = "";
  mensaje: number = 0;
  constructor(private ContenidoService: ContenidoService) { }

  limpiarIdBorrado() {
    this.idBorrado = "";
  }
  limpiarMensaje() {
    this.mensaje = 0;
  }
  borradoNoticia() {
    console.log(this.idBorrado);
    this.ContenidoService.borrarNoticia(this.idBorrado).subscribe(
      {
        next: data => {
          if (data !== "No se ha podido borrar") {
            this.ContenidoService.borrar(this.idBorrado);
            this.mensaje = 1
          }
        },
        error: error => {
          this.mensaje = 2;
        }
      });
  }

}
