import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { Dia, Direccion, Horario, HorarioMostrar, Telefono, Hora, HorarioGuardar } from '../interfaces/config.interface';
import { ConfigService } from '../services/config.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-contacto-config',
  templateUrl: './contacto-config.component.html',
  styleUrls: ['./contacto-config.component.scss']
})
export class ContactoConfigComponent { //Todo hecho por Alicia

  mensaje: String = '';
  actualizado!: boolean;
  telefonos: Telefono[] = [];
  tBorrar: number[] = [];
  direcciones: Direccion[] = [];
  horarios: Horario[] = [];
  hMostrar: HorarioMostrar[] = [];
  dSemana = [{ nombre: "Lunes", letra: "L" }, { nombre: "Martes", letra: "M" }, { nombre: "Miércoles", letra: "X" },
  { nombre: "Jueves", letra: "J" }, { nombre: "Viernes", letra: "V" }, { nombre: "Sábado", letra: "S" }];

  constructor(
    private ConfigService: ConfigService,
    private SharedService: SharedService
  ) { }


  ngOnInit() {
    this.SharedService.getHorarios().subscribe(resp => {
      if (resp.success) {
        this.horarios = resp.data;
        this.crearHorarioMostrar();
      }
    });


    this.SharedService.getTelefonos().subscribe(resp => {
      if (resp.success) this.telefonos = resp.data;
    });


    this.SharedService.getDirecciones().subscribe(resp => {
      if (resp.success) this.direcciones = resp.data;
    });
  }


  guardar() {
    const tlfns = { guardar: this.telefonos, borrar: this.tBorrar };
    const horarios = this.crearHorarioGuardar();

    this.ConfigService.updateContacto(this.direcciones, tlfns, horarios)
      .subscribe(resp => {

        this.mensaje = resp.msg;
        this.actualizado = (resp.success) ? true : false;

        setTimeout(() => this.mensaje = '', 4000);
      });
  }


  addTelefono() {
    this.telefonos.push({
      id: -1,
      numero: "",
      extension: 0
    });
  }


  addHorario() {
    let listaDias: Dia[] = [];

    this.dSemana.forEach(dia => { //TODO: LLevar a función auxiliar
      listaDias.push(this.crearDia(dia.nombre, dia.letra, false));
    });

    this.addHorarioMostrar(listaDias);
  }


  deleteHorario(event: Event) {

  }


  deleteTelefono(index: number) {
    const tlfn = this.telefonos.splice(index, 1);
    this.tBorrar.push(tlfn[0].id);
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
    let horas: Hora[] = [];
    let diasHora: Horario[] = [];
    let listaDias: Dia[];
    let idDia: number | undefined;
    let selecc: boolean;

    this.horarios.forEach(horario => { // Recojo los distintos grupos de horas
      if (!horas.find(h => h.entrada == horario.hEntrada && h.salida == horario.hSalida))
        horas.push({ "entrada": horario.hEntrada, "salida": horario.hSalida });
    });

    horas.forEach(hora => { // Recojo los días que tienen ese grupo de horas
      listaDias = [];
      diasHora = this.horarios.filter(h => h.hEntrada == hora.entrada && h.hSalida == hora.salida);

      this.dSemana.forEach(dia => {
        idDia = diasHora.find(d => d.dia == dia.nombre)?.id;
        selecc = (diasHora.find(d => d.dia == dia.nombre)) ? true : false;
        listaDias.push(this.crearDia(dia.nombre, dia.letra, selecc, idDia));
      });

      this.addHorarioMostrar(listaDias, hora.entrada, hora.salida);
    });
  }


  addHorarioMostrar(listaDias: Dia[], entrada: Time = { hours: 0, minutes: 0 }, salida: Time = { hours: 0, minutes: 0 }) {
    this.hMostrar.push({
      dias: listaDias,
      hEntrada: entrada,
      hSalida: salida
    });
  }


  crearDia(valor:string, letra:string, selecc:boolean, id:number = -1) {
    return {
      id: id,
      valor: valor,
      letra: letra,
      seleccionado: selecc
    }
  }
}

