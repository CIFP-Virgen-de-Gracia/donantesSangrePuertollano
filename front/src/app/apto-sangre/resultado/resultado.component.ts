import { Component } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent {
  constructor(public ServicioService: ServicioService) { }

}
