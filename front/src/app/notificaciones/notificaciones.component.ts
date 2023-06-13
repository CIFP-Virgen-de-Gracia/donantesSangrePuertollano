import { Component, OnInit } from '@angular/core';
import { Notificaciones } from './interface/notificaciones';
import { NotificacionesService } from './service/notificaciones.service.service';
import { AuthService } from '../auth/services/auth.service';
import { GaleriaService } from '../galeria/service/galeria.service';
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  notificacionesPendienteImagenes: Notificaciones[] = [];
  puedeModificar: boolean = false;
  estaRegistrado: boolean = false;

  constructor(private notificacionService: NotificacionesService, private galeriaService: GaleriaService, private AuthService: AuthService) {}
  ngOnInit(): void {

    const idUser = JSON.parse(localStorage.getItem('user') || ('')).id;
    this.notificacionService.mostrarNotificacionUsuario(idUser).subscribe( notificacion => {
      this.notificacionesPendienteImagenes = notificacion;
      console.log(this.notificacionesPendienteImagenes[0].PeticionesGalerium[0].nombre);
    });




    const user = localStorage.getItem('user');
    if (user) {
      this.estaRegistrado = true;

      this.comprobarPuedeModificar();
    }

    this.notificacionService.comprobarPermisos.subscribe((registrado:boolean) => {
      this.estaRegistrado = registrado;

      this.comprobarPuedeModificar();
    })

  }

  comprobarPuedeModificar() {
    if (this.estaRegistrado) {
      this.AuthService.puedeModificar().subscribe((resp:boolean) => {
        this.puedeModificar = (resp) ? true : false;
      });
    }
  }
}
