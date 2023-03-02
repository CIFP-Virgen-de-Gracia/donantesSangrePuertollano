import { Component } from '@angular/core';
import { Direccion, Horario, Telefono } from '../interfaces/config.interface';
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
  telefonos: Telefono[] = [];
  direcciones: Direccion[] = [];

  constructor(private ConfigService: ConfigService) { }


  ngOnInit() {
    this.ConfigService.getHorarios().subscribe(resp => {
      if (resp.success) this.horarios = resp.data;
    });


    this.ConfigService.getTelefonos().subscribe(resp => {
      if (resp.success) this.telefonos = resp.data;
    });


    this.ConfigService.getDirecciones().subscribe(resp => {
      if (resp.success) this.direcciones = resp.data;
    });
  }


  guardar() {

  }

  addTelefono() {

  }

  addHorario() {

  }
}
