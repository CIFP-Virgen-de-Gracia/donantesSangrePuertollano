import { Injectable, EventEmitter, Output } from '@angular/core';
import { ResponseComentario,Mensaje } from '../interfaces/paginas.interface';
import { Socket } from 'ngx-socket-io';
import { ChatService } from './chat.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  @Output() outEven: EventEmitter<any> = new EventEmitter();

  constructor(private ChatService: ChatService) {
    super({
      url: environment.baseSocket,
      options: {
        query: {
          payload: localStorage.getItem('user')
        }
      }

    })
    this.ioSocket.on('enviar-mensaje', (res: any) => this.outEven.emit(res))
  }

  emitEvent = (event = 'enviar-mensaje', payload = {}) => {
    this.ioSocket.emit('enviar-mensaje', {
      payload
    }, (respuesta: ResponseComentario) => {
      if (respuesta.success) {
        console.log(respuesta.data)
        let m: Mensaje = {
          "nombre": respuesta.data.nombre,
          "mensaje": respuesta.data.mensaje,
          "idUser": respuesta.data.idUser,
          "fecha": respuesta.data.fecha,
          "hora": respuesta.data.hora,
        }
        console.log(m);
        this.ChatService.addMensaje(m);
      }
    });
  }
}
