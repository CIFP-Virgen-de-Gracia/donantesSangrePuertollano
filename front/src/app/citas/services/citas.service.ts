import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import * as interfaces from '../interfaces/citas.interface';


@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private pedirCitaUrl = `${environment.baseUrl}/api/citas`;
  private _horasCitas: any;
  private _citasReservadas: any;
  private _citasPendientesUser: interfaces.Cita[];
  private _citasPasadasUser: interfaces.Cita[];

  constructor(private httpPedirCita: HttpClient) { }

  fetchHorasDisponibles(fecha: string) {
    return this.httpPedirCita.get<interfaces.HorarioCitasResponse>(this.pedirCitaUrl 
      + '/gethorasdisponibles/' + fecha).pipe(tap(citas => this._citasReservadas = citas));
  }

  // fetchHorarioCitas() {
  //   return this.httpPedirCita.get<interfaces.HorarioCitasResponse>(this.pedirCitaUrl
  //     + '/gethorariocitas').pipe(tap(horas => this._horasCitas = horas));
  // }

  insertCita(id: string, fecha: string, donacion: string) {
    return this.httpPedirCita.post<interfaces.SuccessMsgResponse>(this.pedirCitaUrl
      + '/pedircita', {id: id, fecha: fecha, donacion: donacion});
  }


  mandarCorreo(id:string, fecha: string, donacion: string) {
    return this.httpPedirCita.post<interfaces.SuccessMsgResponse>(this.pedirCitaUrl
      + '/mandarcorreocita', {id: id, fecha: fecha, donacion: donacion});
  }


  fetchCitaPendiente(id: string) {
    return this.httpPedirCita.get<interfaces.FetchCitasResponse>(this.pedirCitaUrl
      + '/getcitapendienteuser/' + id).pipe(tap(resp => {this._citasPendientesUser = resp.citas;}));
  }

  
  fetchCitasPasadas(id: string) {
    return this.httpPedirCita.get<interfaces.FetchCitasResponse>(this.pedirCitaUrl
      + '/getcitaspasadasuser/' + id).pipe(tap(resp => {this._citasPasadasUser = resp.citas;}));
  }

  cancelarCita(id: string) {
    return this.httpPedirCita.put<interfaces.CancelarCitaResponse>(this.pedirCitaUrl
      + '/cancelarcita/', {id: id});
  }

  compHaPedidoCita(id: string) {
    return this.httpPedirCita.get<interfaces.CancelarCitaResponse>(this.pedirCitaUrl + 
      '/yatienecita/' + id);
  }
}
