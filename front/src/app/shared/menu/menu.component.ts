import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  puedeModificar: boolean = false;
  estaRegistrado: boolean = false;

  constructor(
    private AuthService: AuthService,
    private SharedService: SharedService,
    private router: Router
  ) { }



  ngOnInit() {

    const user = localStorage.getItem('user');
    if (user) {
      this.estaRegistrado = true;

      this.comprobarPuedeModificar();
    }

    this.SharedService.comprobarPermisos.subscribe(registrado => {
      this.estaRegistrado = registrado;

      this.comprobarPuedeModificar();
    })
  }


  comprobarPuedeModificar() {
    if (this.estaRegistrado) {
      this.AuthService.puedeModificar().subscribe(resp => {
        this.puedeModificar = (resp) ? true : false;
      });
    }
  }


  cerrarSesion() {
    localStorage.removeItem('user');

    this.router.navigate(['']);
  }
}
