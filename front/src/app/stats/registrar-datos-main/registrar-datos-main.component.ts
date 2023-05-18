import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-registrar-datos-main',
  templateUrl: './registrar-datos-main.component.html',
  styleUrls: ['./registrar-datos-main.component.scss']
})
export class RegistrarDatosComponent {

  elementos = [
    {
      nombre : "donaciones",
      icono: "fa-hand-holding-droplet"
    },
    {
      nombre : "altas",
      icono: "fa-user-plus"
    }
  ];
  elementoActivo = 0;


  constructor(
    private router: Router,
    private calendar: NgbCalendar
  ) {}


  ngOnInit() {
  }


  getNombre(nombre: string) {
    return nombre.replace('-', ' ');
  }
}
