import { Component } from '@angular/core';
import { Dia, Direccion, Horario, HorarioMostrar, Telefono, Hora, HorarioGuardar } from '../interfaces/config.interface';
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
        this.crearHorarioMostrar();
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
    this.ConfigService.updateContacto(this.direcciones, this.telefonos, this.crearHorarioGuardar())
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


  crearHorarioGuardar() {
    let hGuardar: Horario[] = [];
    let hBorrar: number[] = [];

    this.hMostrar.forEach(horario => {

      horario.dias.forEach(d => {

        if (d.seleccionado) {
          hGuardar.push({
            id: d.id,
            dia: d.valor,
            hEntrada: horario.hEntrada,
            hSalida: horario.hSalida,
          });
        } else if (d.id != -1) hBorrar.push(d.id);
      })
    });

    return { guardar: hGuardar, borrar: hBorrar };
  }


  crearHorarioMostrar() {
    const dSemana = [{nombre:"Lunes", letra:"L"}, {nombre:"Martes", letra:"M"},{nombre:"Miércoles", letra:"X"},
                    {nombre:"Jueves", letra:"J"},{nombre:"Viernes", letra:"V"}];
    let horas: Hora[] = [];
    let diasHora: Horario[] = [];
    let listaDias: Dia[];
    let idDia: number | undefined;

    this.horarios.forEach(horario => {
      if (!horas.find(h => h.entrada == horario.hEntrada && h.salida == horario.hSalida))
        horas.push({ "entrada": horario.hEntrada, "salida": horario.hSalida });
    });

    horas.forEach(hora => {
      listaDias = [];
      diasHora = this.horarios.filter(h => h.hEntrada == hora.entrada && h.hSalida == hora.salida);

      dSemana.forEach(dia => {
        idDia = diasHora.find(d => d.dia == dia.nombre)?.id;
        listaDias.push({
          id: (idDia) ? idDia : -1,
          valor: dia.nombre,
          letra: dia.letra,
          seleccionado: (diasHora.find(d => d.dia == dia.nombre)) ? true : false
        })
      });

      this.hMostrar.push({
        dias: listaDias,
        hEntrada: hora.entrada,
        hSalida: hora.salida
      });
    });
  }
}
