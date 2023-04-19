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

export interface ResponseFaqs{
  success: boolean,
  data: Faq[],
  msg: string,
}
export interface Faq{
  id:string,
  pregunta:string,
  respuesta:string,
}
