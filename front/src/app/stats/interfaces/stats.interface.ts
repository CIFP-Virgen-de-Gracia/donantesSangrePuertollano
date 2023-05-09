export interface StatMostrar {
  donacion: string,
  anio: string,
  mes: string,
  genero: string,
  grupo: string,
}

export interface Stat {
  donacion: string,
  fecha: string,
  genero: string,
  grupo: string
}

export interface StatResponse {
  success: boolean;
  data: Stat[];
}
