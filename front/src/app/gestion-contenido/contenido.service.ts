import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contenido,Noticia,Response,ResponseNoticia } from './Interfaces/Contenido.interface';
import { tap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  baseUrl = environment.baseUrl;
  private noticias: Noticia[];

  constructor(private http: HttpClient) {
    this.noticias = [];
  }

  getListado() {
    return this.http.get<Response>(`${this.baseUrl}/api/noticias/noticias`).pipe(tap(resp => { if (resp.success !== false) { this.noticias = resp.data } }))
  }
  get resultado() {
    return [...this.noticias];
  }
  agregar(noticia:Noticia) {
    this.noticias.unshift(noticia);
  }

  editar(noticia: Noticia) {
    let posicion = this.noticias.findIndex(n => n.id == noticia.id);
    this.noticias[posicion] = noticia;
  }
  borrar(id: string) {
    let not = this.noticias.filter((noticia) => noticia.id != id);
    this.noticias = not;
  }
  borrarNoticia(id: string): Observable<ResponseNoticia> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };
    return this.http.delete<ResponseNoticia>(`${this.baseUrl}/api/noticias/borrar/${id}`,header);
  }
  editarNoticia(id: string, noticia:Noticia): Observable<ResponseNoticia> {
    const payload = new FormData();
    payload.append('id', id);
    payload.append('titulo', noticia.titulo);
    payload.append('subtitulo', noticia.subtitulo);
    payload.append('contenido', noticia.contenido);
    payload.append('seccion', noticia.seccion);
    payload.append('archivo', noticia.imagen);

    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };
    return this.http.put<ResponseNoticia>(`${this.baseUrl}/api/noticias/modificar/`, payload, header);
  }

  obtenerNoticia(id: string): Observable<ResponseNoticia> {
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };
    return this.http.post<ResponseNoticia>(`${this.baseUrl}/api/noticias/get`, {id: id},header);
  }

  añadirNoticia(noticia: Contenido): Observable<ResponseNoticia> {
    const payload = new FormData();
    payload.append('titulo', noticia.titulo);
    payload.append('subtitulo', noticia.subtitulo);
    payload.append('contenido', noticia.contenido);
    payload.append('seccion', noticia.seccion);
    payload.append('archivo', noticia.imagen);
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.post<ResponseNoticia>(`${this.baseUrl}/api/noticias/registrar`, payload, header);
  }
}
