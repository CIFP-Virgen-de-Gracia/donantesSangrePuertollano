import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Cancion, ResponseAudio, Faq, ResponseFaqs } from '../interfaces/paginas.interface';

@Injectable({
  providedIn: 'root'
})
export class PaginasService {

  baseUrl = environment.baseUrl;
  private canciones: Cancion[];
  private faqs: Faq[];

  constructor(private http: HttpClient) {
    this.canciones = [];
    this.faqs = [];
  }
  //Alicia
  getIntegrantesCargo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/getIntegrantesCargo`)
  }

  //Para Pagina de Himnos
  get result() {
    return [...this.canciones];
  }
  getListado(): Observable<ResponseAudio> {
    return this.http.get<ResponseAudio>(`${this.baseUrl}/api/musica/listado`).pipe(tap(resp => { if (resp.success !== false) { this.canciones = resp.data } }))
  }
  //Para Pagina de Faqs
  get resultFaqs() {
    return [...this.faqs];
  }
  getListadoFaqs(): Observable<ResponseFaqs> {
    return this.http.get<ResponseFaqs>(`${this.baseUrl}/api/faq/listado`).pipe(tap(resp => { if (resp.success !== false) { this.faqs = resp.data } }))
  }
}

