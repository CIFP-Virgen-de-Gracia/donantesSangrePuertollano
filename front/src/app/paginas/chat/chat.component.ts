import { Component } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { ChatService } from '../services/chat.service';
import { Mensaje, UserConectado } from '../interfaces/paginas.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  estaRegistrado: boolean;
  chatForm: FormGroup = new FormGroup({
    comentario: new FormControl('', [Validators.required]),
  });
  aviso:number;

  constructor(protected socketService: WebSocketService, private ChatService: ChatService) {
    socketService.outEven.subscribe(res => {
      console.log(res);
      let m: Mensaje = {
        "nombre": res.nombre,
        "mensaje": res.mensaje,
        "idUser": res.idUser,
        "fecha": res.fecha,
        "hora": res.hora,
      }
      ChatService.agregarMensaje(m);
    })
    this.estaRegistrado = false;
    this.aviso=0;
  }

  ngOnInit() {
    if (localStorage.getItem('user') != null) {
      this.ChatService.getListadoMensajes().subscribe((res) => { });
      this.estaRegistrado = true;
    }
  }

  /*Esta por arreglar porque no funciona bien la visualizacion de los usuarios conectados
   y tengo que ver que falla por lo que para el siguiente sprint lo arreglo */
  get Conectados() {
    return this.ChatService.resultConectados;

  }
  get Mensajes() {
    return this.ChatService.resultMensajes;
  }

  sendData = (event: any) => {
    if (this.chatForm.get("comentario")?.value == null) {
      this.aviso=1;
      setTimeout(() => this.aviso = 0, 3000);
    } else if (this.chatForm.get("comentario")!.value.trim() == "") {
      this.aviso=1;
      setTimeout(() => this.aviso = 0, 3000);
    } else {
      let datos = JSON.parse(localStorage.getItem('user') || "");
      this.socketService.emitEvent(event,
        {
          id: datos.id,
          nombreUser: datos.nombre,
          mensaje: this.chatForm.get("comentario")?.value
        });
      this.chatForm.reset();
    }
  }
}
