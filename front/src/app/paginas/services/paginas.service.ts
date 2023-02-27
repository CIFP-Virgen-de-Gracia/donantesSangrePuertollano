import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Integrante } from '../interfaces/Paginas.interfaces';


@Injectable({
  providedIn: 'root'
})
export class PaginasService {

  baseUrl = environment.baseUrl;
  private canciones: any[] = [];

  constructor(private http: HttpClient) { }


  getIntegrantesCargo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/getIntegrantesCargo`)
  }

  //Para Pagina de Himnos
  get result() {
    return [...this.canciones];
  }
  getListado() {
    return this.http.get<any>(`${this.baseUrl}/api/Musica/listado`).pipe(tap(resp => { if (resp !== "No encontrada") { this.canciones = resp } }))
  }

}
