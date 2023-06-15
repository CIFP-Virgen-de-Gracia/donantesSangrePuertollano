import { Time } from "@angular/common";
import { PeticionGaleria } from '../../galeria/interface/peticion-galeria';

export interface Notificaciones {
  titulo: string;
  mensaje: string;
  galeriaPeticionID: number;
  idUsuarioRegistrado: number;
  idUsuarioAdministrador: number;
  leido: number;
  createdAt: Time;
  PeticionesGalerium: PeticionGaleria[];

}
