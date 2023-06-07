import { Injectable, EventEmitter, Output, Input } from '@angular/core';
import { ResponseComentario, Mensaje, ResponseListaConectados, ResponseMensajes, MsgResponseBorrado } from '../interfaces/paginas.interface';
import { Socket } from 'ngx-socket-io';
import { ChatService } from './chat.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  @Output() usuariosConectados: EventEmitter<string[]> = new EventEmitter();
  @Output() conectarChat: EventEmitter<string[]> = new EventEmitter();
  @Output() borrarTodo: EventEmitter<any> = new EventEmitter();

  constructor(private ChatService: ChatService) {

    super({
      url: environment.socketUrl,
      options: {
        query: {
          payload:localStorage.getItem('user')
        }
      }

    });
    this.ioSocket.on('enviar-mensaje', (res: any) => this.outEven.emit(res));
    this.ioSocket.on('usuario-conectado', (usuarios: string[]) => this.usuariosConectados.emit(usuarios));
    this.ioSocket.on('borrarTodo', (res: any) => this.borrarTodo.emit(res));
  }

  emitEventInicioSesion = (event = 'iniciarSesion', payload = {}) => {
    this.ioSocket.emit('iniciarSesion', {
      payload
    }, (respuesta: ResponseListaConectados) => {
      if (respuesta.success) {

        this.ChatService.setListaConectados(respuesta.data);
      }
    });
  }
  emitEventLista = (event = 'lista', payload = {}) => {
    this.ioSocket.emit('lista', {
      payload
    }, (respuesta: ResponseListaConectados) => {
      if (respuesta.success) {

        this.ChatService.setListaConectados(respuesta.data);
      }
    });
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
  emitEventDesconectar = (event = 'logout', payload = {}) => {
    this.ioSocket.emit('logout', {
      payload
    }, (respuesta: ResponseListaConectados) => {
      if (respuesta.success) {
        this.ChatService.setListaConectados(respuesta.data);
      }
    });
  }
  emitEventBorrarTodo = (payload = {}): Promise<MsgResponseBorrado> => {
    return new Promise((resolve, reject) => {
      this.ioSocket.emit('borrarTodo', payload, (respuesta: ResponseMensajes) => {
        resolve(respuesta);
      });
    });
  }


  emitEventConectarChat = (payload = {}) => {
    console.log(payload);
    this.ioSocket.emit('conectar-chat', { payload }, (respuesta: string[]) => {
      this.ChatService.setListaConectados(respuesta);
    });
  }
}
