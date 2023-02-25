import { Component, OnInit } from '@angular/core';
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
  ) { }


  ngOnInit() {

    this.SharedService.comprobarPermisos.subscribe(registrado => {
      this.estaRegistrado = registrado;

      if (registrado) {
        this.AuthService.puedeModificar().subscribe(resp => {
          this.puedeModificar = (resp) ? true : false;
        });
      }
    })

    /* this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        const user = localStorage.getItem('user');

        if (user) {
          this.estaRegistrado = true;


          this.AuthService.puedeModificar().subscribe(resp => {
            this.puedeModificar = (resp) ? true : false;
          });
        }
      }
    }); */
  }
}
