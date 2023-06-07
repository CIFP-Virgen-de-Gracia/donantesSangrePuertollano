export interface DireccionResponse { //Alicia
  success: boolean,
  msg: string,
  data: Direccion[],
}

export interface Direccion { //Alicia
  id: number,
  lugar: string,
  calle: string,
  numero: string,
  ciudad: string,
  provincia: string,
  cp: number,
}
