import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Integrante } from 'src/app/shared/interfaces/shared.interface';
import { cargoResponse, Direccion, HorarioGuardar, Telefono, TelefonoGuardar } from '../interfaces/config.interface';
import { horarioResponse } from '../interfaces/config.interface';
import { telefonoResponse } from '../interfaces/config.interface';
import { direccionResponse } from '../interfaces/config.interface';
import { updateResponse } from '../interfaces/config.interface';
import { Cancion, ResponseAudio, Himno, ResponseCancion } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = `${environment.baseUrl}/api`;
  private canciones: Cancion[];

  constructor(private http: HttpClient) {
    this.canciones = [];
  }


  updateHermandad(historia:String, junta:Integrante[]): Observable<updateResponse> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token' : JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.put<updateResponse>(`${this.configUrl}/updateHermandad`, { historia: historia, junta: junta}, header);
  }


  updateContacto(dirs: Direccion[], tlfns: TelefonoGuardar, horarios: HorarioGuardar): Observable<updateResponse> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token': JSON.parse(localStorage.getItem('user')!).token
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

  //Audio o Himnos
  get audios() {
    return [...this.canciones];
  }
  getListadoAudio(): Observable<ResponseAudio> {
    return this.http.get<ResponseAudio>(`${this.configUrl}/api/musica/listado`).pipe(tap(resp => { if (resp.success !== false) { this.canciones = resp.data } }))
  }
  agregarAudio(cancion: Cancion) {
    this.canciones.unshift(cancion);
  }

  addAudio(cancion: Himno): Observable<ResponseCancion> {
    const payload = new FormData();
    payload.append('titulo', cancion.titulo);
    payload.append('letra', cancion.letra);
    payload.append('archivo', cancion.archivo);
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.post<ResponseCancion>(`${this.configUrl}/api/musica/insertar`, payload, header);
  }
  borrarHimno(id: string) {
    let audios = this.canciones.filter((c) => c.id != id);
    this.canciones = audios;
  }

  borrarAudio(id: string): Observable<ResponseCancion> {
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.delete<ResponseCancion>(`${this.configUrl}/api/musica/borrar/${id}`, header);
  }
  borrarHimnoTodos() {
    this.canciones = [];
  }

  borrarTodos(): Observable<ResponseAudio> {
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.delete<ResponseAudio>(`${this.configUrl}/api/musica/borrar`, header);
  }

  editarAudio(id: string, cancion: Cancion): Observable<ResponseCancion> {
    const payload = new FormData();
    payload.append('id', id);
    payload.append('titulo', cancion.titulo);
    payload.append('letra', cancion.letra);
    payload.append('archivo', cancion.cancion);
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };
    return this.http.put<ResponseCancion>(`${this.configUrl}/api/musica/modificar/`, payload, header);
  }
  obtenerCancion(id: string): Observable<ResponseCancion> {
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.post<ResponseCancion>(`${this.configUrl}/api/musica/get`,{id:id},header);
  }
  editarCancion(cancion: Cancion) {
    let posicion = this.canciones.findIndex(c => c.id == cancion.id);
    this.canciones[posicion] = cancion;
  }
}
