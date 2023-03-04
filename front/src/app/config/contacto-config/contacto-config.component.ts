import { Component } from '@angular/core';
import { Dia, Direccion, Horario, HorarioMostrar, Telefono, Hora } from '../interfaces/config.interface';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-contacto-config',
  templateUrl: './contacto-config.component.html',
  styleUrls: ['./contacto-config.component.scss']
})
export class ContactoConfigComponent {

  mensaje: String = '';
  actualizado!: boolean;
  telefonos: Telefono[] = [];
  direcciones: Direccion[] = [];
  horarios: Horario[] = [];
  hMostrar: HorarioMostrar[] = [];

  constructor(private ConfigService: ConfigService) { }


  ngOnInit() {
    this.ConfigService.getHorarios().subscribe(resp => {
      if (resp.success) {
        this.horarios = resp.data;
        this.generarHorario();
      }
    });


    this.ConfigService.getTelefonos().subscribe(resp => {
      if (resp.success) this.telefonos = resp.data;
    });


    this.ConfigService.getDirecciones().subscribe(resp => {
      if (resp.success) this.direcciones = resp.data;
    });
  }


  guardar() {
    this.ConfigService.updateContacto(this.direcciones, this.telefonos)
      .subscribe(resp => {

        this.mensaje = resp.msg;
        this.actualizado = (resp.success) ? true : false;

        setTimeout(() => this.mensaje = '', 4000);
      });
  }


  addTelefono() {

  }


  addHorario() {

  }


  generarHorario() {
    const dSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    let horas: Hora[] = [];
    let diasHora: Horario[] = [];
    let dias: Dia[];

    this.horarios.forEach(horario => {
      if (!horas.find(h => h.entrada == horario.hEntrada && h.salida == horario.hSalida))
        horas.push({ "entrada": horario.hEntrada, "salida": horario.hSalida });
    });

    horas.forEach(hora => {
      dias = [];
      diasHora = this.horarios.filter(h => h.hEntrada == hora.entrada && h.hSalida == hora.salida);

      dSemana.forEach(dia => {
        dias.push({
          valor: dia,
          letra: dia.charAt(0),
          seleccionado: (diasHora.find(d => d.dia == dia)) ? true : false
        })
      });

      this.hMostrar.push({
        dias: dias,
        hEntrada: hora.entrada,
        hSalida: hora.salida
      });
    });
  }
}
