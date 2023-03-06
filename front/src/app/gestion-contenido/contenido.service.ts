import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contenido } from './Interfaces/Contenido.interface';
import { tap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  baseUrl = environment.baseUrl;
  private noticias: any[];

  constructor(private http: HttpClient) {
    this.noticias = [];
  }

  getListado() {
    return this.http.get<any>(`${this.baseUrl}/api/noticias/noticias`).pipe(tap(resp => { if (resp !== "No encontrada") { this.noticias = resp } }))
  }


  get resultado() {
    return [...this.noticias];
  }


  agregar(noticia: any) {
    this.noticias.unshift(noticia);
  }


  editar(id: string, noticia: any) {
    let posicion = this.noticias.findIndex(n => n.id == id);

    this.noticias[posicion] = noticia;
  }


  borrar(id: string) {
    let not = this.noticias.filter((noticia) => noticia.id != id);
    this.noticias = not;
  }


  borrarNoticia(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/noticias/borrar/${id}`);
  }


  editarNoticia(id: string, noticia: Contenido): Observable<any> {
    const payload = new FormData();
    payload.append('id', id);
    payload.append('titulo', noticia.titulo);
    payload.append('subtitulo', noticia.subtitulo);
    payload.append('contenido', noticia.contenido);
    payload.append('seccion', noticia.seccion);
    payload.append('archivo', noticia.imagen);


    return this.http.put<any>(`${this.baseUrl}/api/noticias/modificar/`, payload);
  }


  obtenerNoticia(id: string): Observable<any> {
    let idnot = {
      id: id
    }
    return this.http.post<any>(`${this.baseUrl}/api/noticias/get`, idnot);
  }
  

  añadirNoticia(noticia: Contenido): Observable<any> {
    const payload = new FormData();
    payload.append('titulo', noticia.titulo);
    payload.append('subtitulo', noticia.subtitulo);
    payload.append('contenido', noticia.contenido);
    payload.append('seccion', noticia.seccion);
    payload.append('archivo', noticia.imagen);

    return this.http.post<any>(`${this.baseUrl}/api/noticias/registrar`, payload);
  }
}
