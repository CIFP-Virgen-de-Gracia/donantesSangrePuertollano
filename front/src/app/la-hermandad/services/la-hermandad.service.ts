import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CargoResponse, HistoriaUpdateResponse, IntDeleteResponse, Integrante, IntUpdateInsertResponse } from '../interfaces/la-hermandad.interface';



@Injectable({
  providedIn: 'root'
})
//Alicia
export class LaHermandadService {

  configUrl = `${environment.baseUrl}/api`;


  constructor(private http: HttpClient) { }


  updateHistoria(historia: string): Observable<HistoriaUpdateResponse> {
    const header = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': JSON.parse(localStorage.getItem('user')!).token
    })};

    return this.http.put<HistoriaUpdateResponse>(`${this.configUrl}/updateHistoria`, { historia: historia }, header);
  }


  getCargosJunta(): Observable<CargoResponse> {
    return this.http.get<CargoResponse>(`${this.configUrl}/getCargosJunta`);
  }


  updateIntegranteJunta(integrante: Integrante): Observable<IntUpdateInsertResponse> {
    const header = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': JSON.parse(localStorage.getItem('user')!).token
    })};

    return this.http.put<IntUpdateInsertResponse>(`${this.configUrl}/updateIntegranteJunta`, integrante, header);
  }


  deleteIntegranteJunta(id: number): Observable<IntDeleteResponse> {
    const header = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': JSON.parse(localStorage.getItem('user')!).token
    })};

    return this.http.delete<IntDeleteResponse>(`${this.configUrl}/deleteIntegranteJunta/${id}`, header);
  }
}
