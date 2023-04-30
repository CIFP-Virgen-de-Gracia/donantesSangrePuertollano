import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable, tap } from 'rxjs';
import { Mensaje, UserConectado, ResponseMensaje, ResponseConectado } from '../interfaces/paginas.interface';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = environment.baseUrl;
  private mensajes: Mensaje[];
  private listaConectados: UserConectado[];

  constructor(private http: HttpClient) {
    this.mensajes = [];
    this.listaConectados = [];
  }
  get resultMensajes() {
    return [...this.mensajes];
  }
  get resultConectados() {
    return [...this.listaConectados];
  }
  getListadoMensajes(): Observable<ResponseMensaje> {
    return this.http.get<ResponseMensaje>(`${this.baseUrl}/api/chat/listado`).pipe(tap(resp => { if (resp.success !== false) { this.mensajes = resp.data } }))
  }
  addMensaje(mensaje: Mensaje): Observable<ResponseMensaje> {
    return this.http.post<ResponseMensaje>(`${this.baseUrl}/api/chat/add`, mensaje);
  }
  agregarMensaje(mensaje: Mensaje): void {
    this.mensajes.push(mensaje);

  }
  agregarConectado(usuario: UserConectado): void {
    this.listaConectados.push(usuario);
    console.log(this.listaConectados);
  }
  borrarConectado(usuario: UserConectado): void {
    let lista = this.listaConectados.filter((u) => u.id != usuario.id);
    this.listaConectados = lista;
    console.log(this.listaConectados);
  }


}
