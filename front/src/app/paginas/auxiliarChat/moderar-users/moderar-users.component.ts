import { Component, OnInit, } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-moderar-users',
  templateUrl: './moderar-users.component.html',
  styleUrls: ['./moderar-users.component.scss']
})
export class ModerarUsersComponent implements OnInit {
  p: number;
  valorFiltro:string
  constructor(protected socketService: WebSocketService, private ChatService: ChatService) {
    this.p = 1
    this.valorFiltro="";
  }
  ngOnInit() {
      this.ChatService.getListadoDesbloqueados().subscribe((resp => { }));
      this.ChatService.getListadoBloqueados().subscribe((resp => { }));

  }
  get Bloqueados() {
    return this.ChatService.resultBloqueados;
  }
  get Desbloqueados() {
    return this.ChatService.resultDesbloqueados;
  }
  Search(value: string) {
  this.valorFiltro=value;
  }


}
