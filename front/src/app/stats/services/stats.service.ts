import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { DonacionResponse, AltaResponse, MsgResponse } from '../interfaces/stats.interface';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private url = `${environment.baseUrl}/api/stats`;
  header;

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) this.header = { headers: new HttpHeaders({ 'x-token': JSON.parse(user).token }) };
  }


  getDonaciones(): Observable<DonacionResponse> {
    return this.http.get<DonacionResponse>(this.url+ '/getDonaciones');
  }


  getAltas(): Observable<AltaResponse> {
    return this.http.get<AltaResponse>(this.url+ '/getAltas');
  }


  insertDonacion(payload: FormData): Observable<MsgResponse> {
    return this.http.post<MsgResponse>(this.url+ '/insertDonacion', payload, this.header);
  }


  insertAltas(payload: FormData): Observable<MsgResponse> {
    return this.http.post<MsgResponse>(this.url+ '/insertAltas', payload, this.header);
  }

  getTiposDonacion(): Observable<any> {
    return this.http.get<any>(this.url+ '/getTiposDonacion');
  }
}
