import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { StatResponse } from '../interfaces/stats.interface';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private url = `${environment.baseUrl}/api/stats`;


  constructor(private http: HttpClient) { }


  getDonaciones(): Observable<StatResponse> {
    return this.http.get<StatResponse>(this.url+ '/getDonaciones');
  }

  getTiposDonacion(): Observable<any> {
    return this.http.get<any>(this.url+ '/getTiposDonacion');
  }
}
