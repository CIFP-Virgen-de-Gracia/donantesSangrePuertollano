import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable, tap } from 'rxjs';
import { Mensaje, ResponseMensaje, ResponseModerarUser } from '../interfaces/paginas.interface';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = environment.baseUrl;
  private mensajes: Mensaje[];
  private listaConectados: String[];
  private bloqueados: String[];
  private desbloqueados: String[];

  constructor(private http: HttpClient) {
    this.mensajes = [];
    this.listaConectados = [];
    this.bloqueados = [];
    this.desbloqueados = [];
  }
  get resultMensajes() {
    return [...this.mensajes];
  }
  get resultConectados() {
    return [...this.listaConectados];
  }
  get resultBloqueados() {
    return [...this.bloqueados];
  }
  get resultDesbloqueados() {
    return [...this.desbloqueados];
  }
  getListadoMensajes(): Observable<ResponseMensaje> {
    return this.http.get<ResponseMensaje>(`${this.baseUrl}/api/chat/listado`).pipe(tap(resp => { if (resp.success !== false) { this.mensajes = resp.data } }))
  }
  getListadoBloqueados(): Observable<ResponseModerarUser> {
    return this.http.get<ResponseModerarUser>(`${this.baseUrl}/api/chat/listadobloqueados`).pipe(tap(resp => { if (resp.success !== false) { this.bloqueados = resp.data } }))
  }
  getListadoDesbloqueados(): Observable<ResponseModerarUser> {
    return this.http.get<ResponseModerarUser>(`${this.baseUrl}/api/chat/listadodesbloqueados`).pipe(tap(resp => { if (resp.success !== false) { this.desbloqueados = resp.data } }))
  }

  addMensaje(mensaje: Mensaje): Observable<ResponseMensaje> {
    return this.http.post<ResponseMensaje>(`${this.baseUrl}/api/chat/add`, mensaje);
  }
  agregarMensaje(mensaje: Mensaje): void {
    this.mensajes.push(mensaje);

  }
  setListaConectados(lista: string[]) {
    this.listaConectados = lista;
  }

  borrarTodo() {
    this.mensajes=[];
  }

}
