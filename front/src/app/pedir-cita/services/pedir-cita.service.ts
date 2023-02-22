import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import * as interfaces from '../interfaces/pedir-cita.interface';


@Injectable({
  providedIn: 'root'
})
export class PedirCitaService {
  private pedirCitaUrl = `${environment.baseUrl}/api/citas`;
  private _horasCitas: any;
  private _citasReservadas: any;

  constructor(private httpPedirCita: HttpClient) { }

  fetchHorasDisponibles(fecha: string) {
    return this.httpPedirCita.get<interfaces.HorarioCitasResponse>(this.pedirCitaUrl 
      + '/gethorasdisponibles/' + fecha).pipe(tap(citas => this._citasReservadas = citas));
  }

  // fetchHorarioCitas() {
  //   return this.httpPedirCita.get<interfaces.HorarioCitasResponse>(this.pedirCitaUrl
  //     + '/gethorariocitas').pipe(tap(horas => this._horasCitas = horas));
  // }

  insertCita(id: string, fecha: string) {
    return this.httpPedirCita.post<interfaces.SuccessMsgResponse>(this.pedirCitaUrl
      + '/pedircita', {id: id, fecha: fecha});
  }


  mandarCorreo(id:string, fecha: string) {
    return this.httpPedirCita.post<interfaces.SuccessMsgResponse>(this.pedirCitaUrl
      + '/mandarcorreocita', {id: id, fecha: fecha});
  }
}
