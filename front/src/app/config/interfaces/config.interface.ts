export interface Cargo { //Alicia
  id: number;
  nombre: string;
}
export interface ResponseAudio{ //Isa
  success: boolean,
  data: Cancion[],
  msg: string,
}
export interface ResponseCancion{ //Isa
  success: boolean,
  data: Cancion,
  msg: string,
}
export interface Himno{ //Isa
  archivo:any,
  titulo:string,
  letra:string
}
export interface Cancion{ //Isa
  id:string,
  nombre:string,
  titulo:string,
  letra:string,
  cancion:any,
  descarga:string
}
