export interface StatMostrar {
  donacion: string,
  anio: string,
  mes: string,
  genero: string,
  gSanguineo?: string,
}

export interface Donacion {
  id: number,
  nDonante: number,
  gSanguineo: string,
  donacion: string,
  fecha: string,
  genero: string
}

export interface DonacionResponse {
  success: boolean;
  data: Donacion[];
}

export interface numAltasResponse {
  success: boolean;
  data: number[];
}

