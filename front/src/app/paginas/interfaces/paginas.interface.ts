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

export interface MemoriaResponse {
  success: boolean,
  data: Memoria[]
}

export interface Memoria {
  id: number,
  anio: number,
  imagen: string,
  archivo: string
}
