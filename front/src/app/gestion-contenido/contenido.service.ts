import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contenido} from './Interfaces/Contenido.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  private baseURL: string = "http://127.0.0.1:8090/api/noticias";

  constructor(private http: HttpClient) { }

  noticias: any[] = [];

  getListado() {
    return this.http.get<any>(`${this.baseURL}/noticias`).pipe(tap(resp => this.noticias = resp))
  }


  añadirNoticia(noticia:Contenido) {
    let json = JSON.stringify(noticia);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(`${this.baseURL}/registrar`, json, { headers });
  }
}
