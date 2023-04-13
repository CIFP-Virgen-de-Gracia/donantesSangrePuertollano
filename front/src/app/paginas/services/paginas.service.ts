import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { BorrarResponse, Cancion, MemoriaResponse, ResponseAudio} from '../interfaces/paginas.interface';

@Injectable({
  providedIn: 'root'
})
export class PaginasService {

  baseUrl = environment.baseUrl + '/api';
  private canciones: Cancion[];

  constructor(private http: HttpClient) {
    this.canciones = [];
  }


  getIntegrantesCargo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getIntegrantesCargo`);
  }


  getMemorias(): Observable<MemoriaResponse> {
    return this.http.get<MemoriaResponse>(`${this.baseUrl}/getMemorias`);
  }


  borrarMemoria(id: number): Observable<BorrarResponse> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.get<BorrarResponse>(`${this.baseUrl}/borrarMemoria/${id}`, header);
  }


  //Para Pagina de Himnos
  get result() {
    return [...this.canciones];
  }

  getListado(): Observable<ResponseAudio> {
    return this.http.get<ResponseAudio>(`${this.baseUrl}/musica/listado`).pipe(tap(resp => { if (resp.success !== false) { this.canciones = resp.data } }))
  }
}

