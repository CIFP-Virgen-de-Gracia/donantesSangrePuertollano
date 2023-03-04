import { Time } from "@angular/common";

export interface updateResponse {
  success: boolean;
  msg: string;
}

export interface cargoResponse {
  success: boolean;
  data: Cargo[];
}

export interface horarioResponse {
  success: boolean;
  data: Horario[];
}

export interface telefonoResponse {
  success: boolean;
  data: Telefono[];
}

export interface direccionResponse {
  success: boolean;
  data: Direccion[];
}

export interface Cargo {
  id: number;
  nombre: string;
}

export interface Horario {
  id: number;
  dia: string;
  hEntrada: Time;
  hSalida: Time;
}

export interface HorarioMostrar {
  dias: Dia[];
  hEntrada: Time;
  hSalida: Time;
}

export interface Dia {
  valor: String;
  letra: String;
  seleccionado: boolean;
}

export interface Hora {
  entrada: Time;
  salida: Time;
}

export interface Telefono {
  id: number;
  numero: string;
  extension: number;
}

export interface Direccion {
  id: number;
  lugar: string;
  calle: string;
  numero: string;
  ciudad: string;
  provincia: string;
  cp: number;
}
