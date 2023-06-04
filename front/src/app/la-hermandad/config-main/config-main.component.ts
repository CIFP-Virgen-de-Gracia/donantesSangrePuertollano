import { Component } from '@angular/core';
import { MensajeInf } from '../interfaces/la-hermandad.interface';
import { entradaSalidaVentana } from 'src/app/shared/animaciones/animaciones';

@Component({
  selector: 'app-config-main',
  templateUrl: './config-main.component.html',
  styleUrls: ['./config-main.component.scss'],
  animations: [ entradaSalidaVentana ]
})
export class ConfigMainComponent { //Alicia

  mensaje: string = '';
  exito: boolean = false;
  timer: NodeJS.Timeout | undefined;


  constructor() {}


  limpiarMensaje() {
    clearTimeout(this.timer);
    this.mensaje = '';
  }


  setTimer(tiempo: number) {
    this.timer = setTimeout(() => this.mensaje = '', tiempo);
  }

  onMensaje(res: MensajeInf) {
    this.limpiarMensaje();

    this.exito = res.exito;
    this.mensaje = res.msg;

    this.setTimer(4000);
  }
}
