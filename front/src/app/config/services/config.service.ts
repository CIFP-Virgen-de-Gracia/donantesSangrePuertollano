import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Integrante } from 'src/app/shared/interfaces/shared.interface';
import { cargoResponse, Direccion, HorarioGuardar, Telefono } from '../interfaces/config.interface';
import { horarioResponse } from '../interfaces/config.interface';
import { telefonoResponse } from '../interfaces/config.interface';
import { direccionResponse } from '../interfaces/config.interface';
import { updateResponse } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = `${environment.baseUrl}/api`;

  constructor(private http: HttpClient) { }


  updateHermandad(historia:String, junta:Integrante[]): Observable<updateResponse> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token' : JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.put<updateResponse>(`${this.configUrl}/updateHermandad`, { historia: historia, junta: junta}, header);
  }


  updateContacto(dirs: Direccion[], tlfns: Telefono[], horarios: HorarioGuardar): Observable<updateResponse> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token' : JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.put<updateResponse>(
      `${this.configUrl}/updateContacto`,
      {
        direcciones: dirs,
        telefonos: tlfns,
        horarios: horarios
      },
      header
    );
  }


  getCargosJunta(): Observable<cargoResponse>{
    return this.http.get<cargoResponse>(`${this.configUrl}/getCargosJunta`);
  }


  getHorarios(): Observable<horarioResponse> {
    return this.http.get<horarioResponse>(`${this.configUrl}/getHorarios`);
  }


  getTelefonos(): Observable<telefonoResponse> {
    return this.http.get<telefonoResponse>(`${this.configUrl}/getTelefonos`);
  }


  getDirecciones(): Observable<direccionResponse> {
    return this.http.get<direccionResponse>(`${this.configUrl}/getDirecciones`);
  }
}
