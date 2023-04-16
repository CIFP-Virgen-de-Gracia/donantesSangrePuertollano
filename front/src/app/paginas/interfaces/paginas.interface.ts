export interface ResponseAudio{
  success: boolean,
  data: Cancion[],
  msg: string,
}

export interface Cancion{
  id:string,
  nombre:string,
  titulo:string,
  letra:string,
  cancion:string,
  descarga:string
}

export interface BorrarMemResponse {
  success: boolean,
  msg: string,
  data: number
}

export interface UpdateMemResponse {
  success: boolean,
  msg: string,
  data: Memoria
}

export interface GetMemResponse {
  success: boolean,
  data: Memoria[]
}

export interface Memoria {
  id: number,
  anio: number,
  imagen: File,
  documento: File
}
