import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Email } from '../interfaces/shared.interface';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  baseUrl = environment.baseUrl + '/api';
  comprobarPermisos: Subject<boolean>


  constructor(private http: HttpClient) {
    this.comprobarPermisos = new Subject<boolean>();
  }


  suscripcionNewsletter(email: Email): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/suscripcionNewsletter`, email);
  }


  getIntegrantesCargo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getIntegrantesCargo`);
  }


  getHistoria(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getHistoria`);
  }
}
