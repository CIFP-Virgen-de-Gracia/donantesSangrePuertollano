import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Integrante } from 'src/app/shared/interfaces/shared.interface';
import { Cancion, ResponseAudio, Himno, ResponseCancion } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseUrl = environment.baseUrl;
  private canciones: Cancion[];

  constructor(private http: HttpClient) {
    this.canciones = [];
  }


  updateConfigHermandad(historia: String, junta: Integrante[]): Observable<any> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.put(`${this.baseUrl}/api/updateConfigHermandad`, { historia: historia, junta: junta }, header);
  }


  getCargosJunta(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/getCargosJunta`);
  }

  //Audio o Himnos
  get audios() {
    return [...this.canciones];
  }
  getListadoAudio(): Observable<ResponseAudio> {
    return this.http.get<ResponseAudio>(`${this.baseUrl}/api/musica/listado`).pipe(tap(resp => { if (resp.success !== false) { this.canciones = resp.data } }))
  }
  agregarAudio(cancion: Cancion) {
    this.canciones.unshift(cancion);
  }

  addAudio(cancion: Himno): Observable<ResponseCancion> {
    const payload = new FormData();
    payload.append('titulo', cancion.titulo);
    payload.append('letra', cancion.letra);
    payload.append('archivo', cancion.archivo);
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.post<ResponseCancion>(`${this.baseUrl}/api/musica/insertar`, payload, header);
  }
  borrarHimno(id: string) {
    let audios = this.canciones.filter((c) => c.id != id);
    this.canciones = audios;
  }

  borrarAudio(id: string): Observable<ResponseCancion> {
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.delete<ResponseCancion>(`${this.baseUrl}/api/musica/borrar/${id}`, header);
  }
  borrarHimnoTodos() {
    this.canciones = [];
  }

  borrarTodos(): Observable<ResponseAudio> {
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.delete<ResponseAudio>(`${this.baseUrl}/api/musica/borrar`, header);
  }

  editarAudio(id: string, cancion: Cancion): Observable<ResponseCancion> {
    const payload = new FormData();
    payload.append('id', id);
    payload.append('titulo', cancion.titulo);
    payload.append('letra', cancion.letra);
    payload.append('archivo', cancion.cancion);
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };
    return this.http.put<ResponseCancion>(`${this.baseUrl}/api/musica/modificar/`, payload, header);
  }
  obtenerCancion(id: string): Observable<ResponseCancion> {
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.post<ResponseCancion>(`${this.baseUrl}/api/musica/get`,{id:id},header);
  }
  editarCancion(cancion: Cancion) {
    let posicion = this.canciones.findIndex(c => c.id == cancion.id);
    this.canciones[posicion] = cancion;
  }
}
