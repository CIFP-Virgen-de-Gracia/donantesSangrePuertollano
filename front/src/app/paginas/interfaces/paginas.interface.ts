export interface ResponseAudio {
  success: boolean,
  data: Cancion[],
  msg: string,
}
export interface Cancion {
  id: string,
  nombre: string,
  titulo: string,
  letra: string,
  cancion: string,
  descarga: string
}

export interface ResponseFaqs {
  success: boolean,
  data: Faq[],
  msg: string,
}
export interface Faq {
  id: string,
  pregunta: string,
  respuesta: string,
}
export interface ResponseMensaje {
  success: boolean,
  data: Mensaje[],
  msg: string,
}
export interface ResponseConectado {
  success: boolean,
  data: UserConectado[],
  msg: string,
}
export interface ResponseComentario {
  success: boolean,
  data: Mensaje,
  msg: string,
}
export interface Mensaje {
  idUser: string,
  nombre: string,
  mensaje: string
  fecha: string,
  hora: string
}
export interface UserConectado {
  id: string,
  nombre: string
}
