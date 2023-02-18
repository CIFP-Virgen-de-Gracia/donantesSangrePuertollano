import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Integrante } from 'src/app/shared/interfaces/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  updateConfigHermandad(historia:String, junta:Integrante[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/updateConfigHermandad`, { historia: historia, junta: junta});
  }

  getCargosJunta(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/getCargosJunta`);
  }
}
