import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-config',
  templateUrl: './main-config.component.html',
  styleUrls: ['./main-config.component.scss']
})
export class MainConfigComponent {

  public elementos = [
    {
      nombre : "hermandad",
      icono: "fa-hand-holding-droplet"
    },
    {
      nombre : "contacto",
      icono: "fa-phone"
    },
    {
      nombre : "himno",
      icono: "fa-headphones"
    },
    {
      nombre : "test apto",
      icono: "fa-vial"
    }
  ];

  public elementoActivo = this.elementos.map(e => e.nombre).indexOf(this.router.url.split('/').pop()!);

  constructor(private router: Router){ }
}
