import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };
    
    return this.httpPedirCita.get<interfaces.HorarioCitasResponse>(this.pedirCitaUrl 
      + '/gethorasdisponibles/' + fecha, header).pipe(tap(citas => this._citasReservadas = citas));
  }

  // fetchHorarioCitas() {
  //   return this.httpPedirCita.get<interfaces.HorarioCitasResponse>(this.pedirCitaUrl
  //     + '/gethorariocitas').pipe(tap(horas => this._horasCitas = horas));
  // }

  insertCita(id: string, fecha: string, donacion: string) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.httpPedirCita.post<interfaces.SuccessMsgResponse>(this.pedirCitaUrl
      + '/pedircita', {id: id, fecha: fecha, donacion: donacion}, header);
  }


  mandarCorreo(id:string, fecha: string, donacion: string) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.httpPedirCita.post<interfaces.SuccessMsgResponse>(this.pedirCitaUrl
      + '/mandarcorreocita', {id: id, fecha: fecha, donacion: donacion}, header);
  }


  fetchCitaPendiente(id: string) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.httpPedirCita.get<interfaces.FetchCitasResponse>(this.pedirCitaUrl
      + '/getcitapendienteuser/' + id, header).pipe(tap(resp => {this._citasPendientesUser = resp.citas;}));
  }

  
  fetchCitasPasadas(id: string) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.httpPedirCita.get<interfaces.FetchCitasResponse>(this.pedirCitaUrl
      + '/getcitaspasadasuser/' + id, header).pipe(tap(resp => {this._citasPasadasUser = resp.citas;}));
  }

  cancelarCita(id: string) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.httpPedirCita.put<interfaces.CancelarCitaResponse>(this.pedirCitaUrl
      + '/cancelarcita/', {id: id}, header);
  }

  compHaPedidoCita(id: string) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.httpPedirCita.get<interfaces.CancelarCitaResponse>(this.pedirCitaUrl + 
      '/yatienecita/' + id, header);
  }
}
