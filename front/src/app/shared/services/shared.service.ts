import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { DireccionResponse, Email, HorarioResponse, TelefonoResponse } from '../interfaces/shared.interface';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  baseUrl = environment.baseUrl + '/api';
  comprobarPermisos: Subject<boolean>;
  citaPedida: Subject<number>;
  /* https://www.c-sharpcorner.com/article/easily-share-data-between-two-unrelated-components-in-angular/ */
  /* https://stackoverflow.com/a/51992202 */


  constructor(private http: HttpClient) {
    this.comprobarPermisos = new Subject<boolean>();
    this.citaPedida = new Subject<number>();
  }

  //Alicia
  suscripcionNewsletter(email: Email): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/suscripcionNewsletter`, email);
  }

  //Alicia
  getIntegrantesCargo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getIntegrantesCargo`);
  }

  //Alicia
  getHistoria(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getHistoria`);
  }

  //Alicia
  getHorarios(): Observable<HorarioResponse> {
    return this.http.get<HorarioResponse>(`${this.baseUrl}/getHorarios`);
  }

  //Alicia
  getTelefonos(): Observable<TelefonoResponse> {
    return this.http.get<TelefonoResponse>(`${this.baseUrl}/getTelefonos`);
  }

  //Alicia
  getDirecciones(): Observable<DireccionResponse> {
    return this.http.get<DireccionResponse>(`${this.baseUrl}/getDirecciones`);
  }
}
