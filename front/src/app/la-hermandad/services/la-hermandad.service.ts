import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CargoResponse, Historia, HistoriaGetResponse, HistoriaUpdateResponse, IntDeleteResponse, Integrante, IntUpdateInsertResponse } from '../interfaces/la-hermandad.interface';



@Injectable({
  providedIn: 'root'
})
//Alicia
export class LaHermandadService {

  baseUrl = `${environment.baseUrl}/api`;


  constructor(private http: HttpClient) { }


  getHistoria(): Observable<HistoriaGetResponse> {
    return this.http.get<HistoriaGetResponse>(`${this.baseUrl}/getHistoria`);
  }


  updateHistoria(historia: Historia): Observable<HistoriaUpdateResponse> {
    const header = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': JSON.parse(localStorage.getItem('user')!).token
    })};

    return this.http.put<HistoriaUpdateResponse>(`${this.baseUrl}/updateHistoria`, historia, header);
  }


  getIntegrantesCargo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getIntegrantesCargo`);
  }


  getCargosJunta(): Observable<CargoResponse> {
    return this.http.get<CargoResponse>(`${this.baseUrl}/getCargosJunta`);
  }


  insertOrUpdateIntegranteJunta(integrante: Integrante): Observable<IntUpdateInsertResponse> {
    const header = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': JSON.parse(localStorage.getItem('user')!).token
    })};

    return this.http.put<IntUpdateInsertResponse>(`${this.baseUrl}/insertOrUpdateIntegranteJunta`, integrante, header);
  }


  deleteIntegranteJunta(id: number): Observable<IntDeleteResponse> {
    const header = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': JSON.parse(localStorage.getItem('user')!).token
    })};

    return this.http.delete<IntDeleteResponse>(`${this.baseUrl}/deleteIntegranteJunta/${id}`, header);
  }
}
