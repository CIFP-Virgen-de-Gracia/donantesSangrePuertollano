export interface HistoriaUpdateResponse { //Alicia
  success: boolean,
  msg: string,
  historia: Historia
}

export interface IntUpdateInsertResponse { //Alicia
  success: boolean,
  msg: string,
  intJunta?: Integrante
}

export interface IntDeleteResponse { //Alicia
  success: boolean,
  msg: string,
  idInt?: number
}

export interface Integrante { //Alicia
  id: number,
  nombre: string,
  cargo: string,
  idCargo: number
}

export interface CargoResponse { //Alicia
  success: boolean,
  data: Cargo[],
}

export interface Cargo { //Alicia
  id: number,
  nombre: string
}

export interface HistoriaGetResponse { //Alicia
  success: boolean,
  historia: Historia,
}

export interface Historia { //Alicia
  id: number,
  nombre: string,
  valor: string
}

export interface MensajeInf {
  exito: boolean,
  msg: string
}
