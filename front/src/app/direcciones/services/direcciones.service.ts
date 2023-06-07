import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { DireccionResponse } from '../interfaces/direcciones.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  baseUrl = environment.baseUrl + '/api';


  constructor(private http: HttpClient) { }


  getDirecciones(): Observable<DireccionResponse> {
    return this.http.get<DireccionResponse>(`${this.baseUrl}/getDirecciones`);
  }
}
