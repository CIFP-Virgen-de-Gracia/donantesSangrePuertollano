import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Integrante } from '../interfaces/Paginas.interfaces';


@Injectable({
  providedIn: 'root'
})
export class PaginasService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getIntegrantesCargo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/getIntegrantesCargo`)
  }
}
