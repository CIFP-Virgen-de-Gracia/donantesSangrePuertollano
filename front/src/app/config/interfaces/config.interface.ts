import { Time } from "@angular/common";

export interface updateResponse { //Alicia
  success: boolean;
  msg: string;
}

export interface cargoResponse {//Alicia
  success: boolean;
  data: Cargo[];
}

export interface Cargo {//Alicia
  id: number;
  nombre: string;
}

export interface Horario {//Alicia
  id: number;
  dia: string;
  hEntrada: Time;
  hSalida: Time;
}

export interface HorarioMostrar {//Alicia
  dias: Dia[];
  hEntrada: Time;
  hSalida: Time;
}

export interface HorarioGuardar {//Alicia
  borrar: number[],
  guardar: Horario[]
}

export interface TelefonoGuardar {//Alicia
  borrar: number[],
  guardar: Telefono[]
}

export interface Dia {//Alicia
  id: number;
  valor: string;
  letra: string;
  seleccionado: boolean;
}

export interface Hora {//Alicia
  entrada: Time;
  salida: Time;
}

export interface Telefono {//Alicia
  id: number;
  numero: string;
  extension: number;
}

export interface Direccion {//Alicia
  id: number;
  lugar: string;
  calle: string;
  numero: string;
  ciudad: string;
  provincia: string;
  cp: number;
}

export interface ResponseAudio{
  success: boolean,
  data: Cancion[],
  msg: string,
}

export interface ResponseCancion{
  success: boolean,
  data: Cancion,
  msg: string,
}

export interface Himno{
  archivo:any,
  titulo:string,
  letra:string
}

export interface Cancion{
  id:string,
  nombre:string,
  titulo:string,
  letra:string,
  cancion:any,
  descarga:string
}
