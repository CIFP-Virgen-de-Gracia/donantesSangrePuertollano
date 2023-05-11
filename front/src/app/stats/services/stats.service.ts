import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { DonacionResponse, numAltasResponse } from '../interfaces/stats.interface';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private url = `${environment.baseUrl}/api/stats`;


  constructor(private http: HttpClient) { }


  getDonaciones(): Observable<DonacionResponse> {
    return this.http.get<DonacionResponse>(this.url+ '/getDonaciones');
  }


  getNumAltas(): Observable<numAltasResponse> {
    return this.http.get<numAltasResponse>(this.url+ '/getNumAltas');
  }


  getTiposDonacion(): Observable<any> {
    return this.http.get<any>(this.url+ '/getTiposDonacion');
  }
}
