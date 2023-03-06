import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Integrante } from 'src/app/shared/interfaces/shared.interface';
import { cargoResponse, Direccion, HorarioGuardar, Telefono, TelefonoGuardar } from '../interfaces/config.interface';
import { updateResponse } from '../interfaces/config.interface';
import { Cancion, ResponseAudio, Himno, ResponseCancion } from '../interfaces/config.interface';
import { Pregunta } from '../../apto-sangre/interface/pregunta';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = `${environment.baseUrl}/api`;
  private canciones: Cancion[];

  constructor(private http: HttpClient) {
    this.canciones = [];
  }

  //Alicia
  updateHermandad(historia:String, junta:Integrante[]): Observable<updateResponse> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token' : JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.put<updateResponse>(`${this.configUrl}/updateHermandad`, { historia: historia, junta: junta}, header);
  }

  //Alicia
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

  //Alicia
  getCargosJunta(): Observable<cargoResponse>{
    return this.http.get<cargoResponse>(`${this.configUrl}/getCargosJunta`);
  }


  //Audio o Himnos (Toda la parte del Audio Isa)
  get audios() {
    return [...this.canciones];
  }
  getListadoAudio(): Observable<ResponseAudio> {
    return this.http.get<ResponseAudio>(`${this.configUrl}/musica/listado`).pipe(tap(resp => { if (resp.success !== false) { this.canciones = resp.data } }))
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

    return this.http.post<ResponseCancion>(`${this.configUrl}/musica/insertar`, payload, header);
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

    return this.http.delete<ResponseCancion>(`${this.configUrl}/musica/borrar/${id}`, header);
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

    return this.http.delete<ResponseAudio>(`${this.configUrl}/musica/borrar`, header);
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
    return this.http.put<ResponseCancion>(`${this.configUrl}/musica/modificar/`, payload, header);
  }
  obtenerCancion(id: string): Observable<ResponseCancion> {
    const header = {
      headers: new HttpHeaders({
        'x-token': JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.post<ResponseCancion>(`${this.configUrl}/musica/get`,{id:id},header);
  }
  editarCancion(cancion: Cancion) {
    let posicion = this.canciones.findIndex(c => c.id == cancion.id);
    this.canciones[posicion] = cancion;
  }

  getPreguntas(): Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(`${this.configUrl}/test-apto/mostrarPreguntas`)
  }

  subirFoto(archivo:FormData): Observable<FormData> {
    return this.http.post<any>(`${this.configUrl}/galeria/insertarGaleria_imagen`, archivo);
  }

  borrarImagenes(id:any): Observable<any>{
    return this.http.delete<any>(`${this.configUrl}/galeria/borrarGaleria_Imagen/${id}`);
  }

  añadirPregunta(pregunta : Pregunta): Observable<any>{
      const payload = new FormData();

      if(pregunta.nombre_img != ""){

        payload.append('enunciado', pregunta.enunciado);
        payload.append('titulo', pregunta.titulo);
        payload.append('archivo', pregunta.nombre_img);
        payload.append('respuesta', pregunta.respuesta.toString());
        payload.append('solucion_problema', pregunta.solucion_problema);

      }
      else{
        payload.append('enunciado', pregunta.enunciado);
        payload.append('titulo', pregunta.titulo);
        payload.append('respuesta', pregunta.respuesta.toString());
        payload.append('solucion_problema', pregunta.solucion_problema);
      }

      return this.http.post<any>(`${this.configUrl}/test-apto/generarPregunta/`, payload);
  }

  modificarPregunta(id:any, pregunta: Pregunta): Observable<any>{
    const payload = new FormData();
    if(pregunta.nombre_img == ''){
      payload.append('enunciado', pregunta.enunciado);
      payload.append('titulo', pregunta.titulo);
      payload.append('respuesta', pregunta.respuesta.toString());
      payload.append('solucion_problema', pregunta.solucion_problema);
    } else{
      payload.append('enunciado', pregunta.enunciado);
      payload.append('titulo', pregunta.titulo);
      payload.append('archivo', pregunta.nombre_img);
      payload.append('respuesta', pregunta.respuesta.toString());
      payload.append('solucion_problema', pregunta.solucion_problema);

    }

      return this.http.put<any>(`${this.configUrl}/test-apto/modificarPregunta/${id}`, payload);
  }

  borrarPregunta(id:any): Observable<any>{
    return this.http.delete<any>(`${this.configUrl}/test-apto/borrarPregunta/${id}`);
  }


}
