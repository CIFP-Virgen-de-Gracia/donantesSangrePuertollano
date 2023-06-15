import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Notificaciones } from '../interface/notificaciones';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private http: HttpClient) {
    this.comprobarPermisos = new Subject<boolean>();
   }

  private baseURL: string = "http://localhost:8090/api/notificacion";
  comprobarPermisos: Subject<boolean>

  crearNotificacionesAdministradores(contenido:FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/crearNotificacionAdministradores`, contenido);
  }


  mostrarNotificacionUsuario(idUser:any): Observable<any> {
    return this.http.get<Notificaciones[]>(`${this.baseURL}/mostrarNotificacionUsuario/${idUser}`);
  }
}
