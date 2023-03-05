import { Component } from '@angular/core';

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
      nombre : "test-apto",
      icono: "fa-vial"
    }
  ];

  public elementoActivo = 0;

  constructor(){}

}
