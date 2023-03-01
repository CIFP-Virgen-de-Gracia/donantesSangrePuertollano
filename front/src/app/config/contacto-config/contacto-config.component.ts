import { Component } from '@angular/core';
import { Direccion, Horario } from '../interfaces/config.interface';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-contacto-config',
  templateUrl: './contacto-config.component.html',
  styleUrls: ['./contacto-config.component.scss']
})
export class ContactoConfigComponent {

  mensaje: String = '';
  actualizado!: boolean;
  horarios: Horario[] = [];
  direcciones: Direccion[] = [];

  constructor(private ConfigService: ConfigService) { }


  ngOnInit() {
    this.ConfigService.getHorarios().subscribe(resp => {
      if (resp.success) this.horarios = resp.data;
    });
  }


  guardar() {

  }

  addTelefono() {

  }

  addHorario() {

  }
}
