import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Email } from '../interfaces/shared.interface';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }



  suscripcionNewsletter(email: Email): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/suscripcionNewsletter`, email);
  }


  getIntegrantesCargo(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/getIntegrantesCargo`);
  }


  getHistoria(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/getHistoria`);
  }
}
