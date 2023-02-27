import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contenido } from './Interfaces/Contenido.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  private baseURL: string = "http://127.0.0.1:8090/api/noticias";
  private noticias: any[] = [];

  constructor(private http: HttpClient) {
  }

  getListado() {
    return this.http.get<any>(`${this.baseURL}/noticias`).pipe(tap(resp => { if (resp !== "No encontrada") { this.noticias = resp } }))
  }
  get resultado() {
    return [...this.noticias];
  }
  agregar(noticia: any) {
    this.noticias.unshift(noticia);
  }
  editar(id: string, noticia: any) {
    console.log(id);
    console.log(noticia);
    let posicion = this.noticias.findIndex(n => n.id == id);
    console.log(posicion);
    this.noticias[posicion] = noticia;
    console.log(this.noticias);

  }
  borrar(id: string) {
    let not = this.noticias.filter((noticia) => noticia.id != id);
    this.noticias = not;
  }
  borrarNoticia(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/borrar/${id}`);
  }
  editarNoticia(id: string, noticia: Contenido): Observable<any> {
    console.log(noticia);
    const payload = new FormData();
    payload.append('id', id);
    payload.append('titulo', noticia.titulo);
    payload.append('subtitulo', noticia.subtitulo);
    payload.append('contenido', noticia.contenido);
    payload.append('seccion', noticia.seccion);
    payload.append('archivo', noticia.imagen);
    console.log(payload.get("titulo"));


    return this.http.put<any>(`${this.baseURL}/modificar/`, payload);
  }
  obtenerInfo(id: string): Contenido {
    let not = this.noticias.filter((noticia) => noticia.id == id);
    let noticia: Contenido = {
      titulo: not[0]["titulo"],
      subtitulo: not[0]["subtitulo"],
      contenido: not[0]["contenido"],
      seccion: "noticias",
      imagen: not[0]["nombreImagen"]
    }
    return noticia;
  }
  obtenerNoticia(id: string): Observable<any> {
    let idnot = {
      id: id
    }
    return this.http.post<any>(`${this.baseURL}/get`, idnot);
  }

  añadirNoticia(noticia: Contenido): Observable<any> {
    const payload = new FormData();
    payload.append('titulo', noticia.titulo);
    payload.append('subtitulo', noticia.subtitulo);
    payload.append('contenido', noticia.contenido);
    payload.append('seccion', noticia.seccion);
    payload.append('archivo', noticia.imagen);

    return this.http.post<any>(`${this.baseURL}/registrar`, payload);
  }
}
