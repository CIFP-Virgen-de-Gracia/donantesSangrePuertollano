import { Injectable, EventEmitter, Output } from '@angular/core';
import { ResponseComentario,Mensaje,UserConectado } from '../interfaces/paginas.interface';
import { Socket } from 'ngx-socket-io';
import { ChatService } from './chat.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  @Output() outEven: EventEmitter<any> = new EventEmitter();

  constructor(private ChatService: ChatService) {
    let datos:any="";
    if (localStorage.getItem('user') != null) {
      datos = JSON.parse(localStorage.getItem('user') || "");
    }
    super({
      url: environment.baseSocket,
      options: {
        query: {
          payload: datos.nombre
        }
      }

    })

    this.ioSocket.on('connect', () => {
      if (localStorage.getItem('user') != null) {
        let datos = JSON.parse(localStorage.getItem('user') || "");
        let u: UserConectado = {
          nombre: datos.nombre,
          id: datos.id
        }
        this.ChatService.agregarConectado(u);

    }});

    // Evento de desconexión
    this.ioSocket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      if (localStorage.getItem('user') != null) {
        let datos = JSON.parse(localStorage.getItem('user') || "");
        let u: UserConectado = {
          nombre: datos.nombre,
          id: datos.id
        }
      this.ChatService.borrarConectado(u);
    }});
    this.ioSocket.on('enviar-mensaje', (res: any) => this.outEven.emit(res))

  }


  emitEvent = (event = 'enviar-mensaje', payload = {}) => {
    this.ioSocket.emit('enviar-mensaje', {
      payload
    }, (respuesta: ResponseComentario) => {
      if (respuesta.success) {
        let m: Mensaje = {
          "nombre": respuesta.data.nombre,
          "mensaje": respuesta.data.mensaje,
          "idUser": respuesta.data.idUser,
          "fecha": respuesta.data.fecha,
          "hora": respuesta.data.hora,
        }
        this.ChatService.agregarMensaje(m);
      }
    });
  }
}
