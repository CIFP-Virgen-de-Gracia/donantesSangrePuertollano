export interface Cargo {
  id: number;
  nombre: string;
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
