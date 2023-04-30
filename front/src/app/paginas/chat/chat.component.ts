import { Component } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from '../services/chat.service';
import { UserConectado } from '../interfaces/paginas.interface';
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
  msg: any;
  messages: any[] = [];

  constructor(protected socketService: WebSocketService, private ChatService: ChatService) {

    socketService.outEven.subscribe(res => {
      this.messages.push(res.msg);
      console.log(this.messages);
    })
    this.estaRegistrado = false;

  }

  ngOnInit() {
    if (localStorage.getItem('user') != null) {
      this.ChatService.getListadoMensajes().subscribe((res) => { console.log(res) });
      this.estaRegistrado = true;
      let datos = JSON.parse(localStorage.getItem('user') || "");
      let u: UserConectado = {
        nombre: datos.nombre,
        id: datos.id
      }
      this.ChatService.agregarConectado(u);
    }
  }
  get Conectados() {
    return this.ChatService.resultConectados;
  }
  get Mensajes() {
    return this.ChatService.resultMensajes;
  }

  sendData = (event: any) => {
    if (this.chatForm.get("comentario")?.value == null) {
      console.log("entro");
    } else if (this.chatForm.get("comentario")!.value.trim() == "") {
      console.log("entro2");
    } else {
      let datos = JSON.parse(localStorage.getItem('user') || "");
      this.socketService.emitEvent(event,
        {
          id: datos.id,
          nombreUser: datos.nombre,
          mensaje: this.chatForm.get("comentario")?.value
        });

      console.log(this.chatForm.get("comentario")?.value);
      this.chatForm.reset();
    }
  }
}
