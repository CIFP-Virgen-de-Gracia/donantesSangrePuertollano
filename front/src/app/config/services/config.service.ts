import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Integrante } from 'src/app/shared/interfaces/shared.interface';
import { Pregunta } from '../../apto-sangre/interface/pregunta';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  updateConfigHermandad(historia:String, junta:Integrante[]): Observable<any> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token' : JSON.parse(localStorage.getItem('user')!).token
      })
    };

    return this.http.put(`${this.baseUrl}/api/updateConfigHermandad`, { historia: historia, junta: junta}, header);
  }


  getCargosJunta(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/getCargosJunta`);
  }

  getPreguntas(): Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(`${this.baseUrl}/api/test-apto/mostrarPreguntas`)
  }

  subirFoto(archivo:FormData): Observable<FormData> {
    return this.http.post<any>(`${this.baseUrl}/api/galeria/insertarGaleria_imagen`, archivo);
  }

  borrarImagenes(id:any): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/api/galeria/borrarGaleria_Imagen/${id}`);
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

      return this.http.post<any>(`${this.baseUrl}/api/test-apto/generarPregunta/`, payload);
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

      return this.http.put<any>(`${this.baseUrl}/api/test-apto/modificarPregunta/${id}`, payload);
  }

  borrarPregunta(id:any): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/api/test-apto/borrarPregunta/${id}`);
  }


}
