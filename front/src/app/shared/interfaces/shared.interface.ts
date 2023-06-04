import { Direccion, Horario, Telefono } from "src/app/config/interfaces/config.interface";

export interface Email { //Alicia
  email: string;
}

export interface HorarioResponse { //Alicia
  success: boolean;
  data: Horario[];
}

export interface TelefonoResponse { //Alicia
  success: boolean;
  data: Telefono[];
}

export interface DireccionResponse { //Alicia
  success: boolean;
  data: Direccion[];
}
