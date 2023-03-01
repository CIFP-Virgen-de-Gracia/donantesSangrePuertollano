import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Integrante } from 'src/app/shared/interfaces/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  updateConfigHermandad(historia:String, junta:Integrante[]): Observable<any> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token' : JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.put(`${this.baseUrl}/api/updateConfigHermandad`, { historia: historia, junta: junta}, header);
  }


  getCargosJunta(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/getCargosJunta`);
  }
}
