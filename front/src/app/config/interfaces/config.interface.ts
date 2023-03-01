import { Time } from "@angular/common";

export interface Cargo {
  id: number;
  nombre: string;
}

export interface Horario {
  id: number;
  dia: string;
  horaEntrada: Time;
  horaSalida: Time;
}

export interface Direccion {
  id: number;
  lugar: string;
  calle: string;
  numero: number;
  ciudad: string;
  provincia: string;
  cp: number;
}
