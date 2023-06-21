import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HorariosService } from '../services/horarios.service';
import { Dia, Hora, Horario, HorarioMostrar } from '../interfaces/horario.interfaces';

@Component({
  selector: 'app-inicio-horarios',
  templateUrl: './inicio-horarios.component.html',
  styleUrls: ['./inicio-horarios.component.scss']
})
export class InicioHorariosComponent implements OnInit {

  horariosMostrar: HorarioMostrar[] = [];
  semanaSinSabado = [{ nombre: "lunes", letra: "l" }, { nombre: "martes", letra: "m" }, { nombre: "miércoles", letra: "x" },
  { nombre: "jueves", letra: "j" }, { nombre: "viernes", letra: "v" }];


  constructor(private horariosService: HorariosService) { }


  ngOnInit() {
    this.horariosService.getHorarios().subscribe(resp => {
      if (resp.success) this.iniciarHorariosMostrar(resp.data);
    });
  }


  iniciarHorariosMostrar(datos: Horario[]) {
    let horas: Hora[] = []; // Horas de entrada y de salida de cada horario.
    let diasHora: Horario[] = [];

    this.horariosMostrar = [];
    datos.forEach(horario => { // Recojo los distintos grupos de horas
      if (!horas.find(h => h.entrada == horario.hEntrada && h.salida == horario.hSalida))
        horas.push({ "entrada": horario.hEntrada, "salida": horario.hSalida });
    });

    for (let i = 0; i < horas.length; i++) { // Recojo los días que tienen ese grupo de horas
      diasHora = datos.filter(h => h.hEntrada == horas[i].entrada && h.hSalida == horas[i].salida);
      const hMostrar: HorarioMostrar = this.crearHorarioMostrar(diasHora, horas[i].entrada, horas[i].salida);
      this.horariosMostrar.push(hMostrar);
    }

    console.log(this.horariosMostrar)
  }


  crearHorarioMostrar(diasHora: Horario[], hEntrada: Time, hSalida: Time) {
    let listaDias: Dia[] = []; //Días de un horario concreto.
    let idDia: number | undefined;

    diasHora.forEach(dia => {
      idDia = dia.id;
      listaDias.push(this.crearDiaMostrar(dia.dia, dia.codDia, true, idDia));
    });

    return {
      dias: listaDias,
      hEntrada: hEntrada,
      hSalida: hSalida
    };
  }


  crearDiaMostrar(nombre: string, letra: string, selecc: boolean, id: number = -1) {
    return {
      id: id,
      nombre: nombre,
      letra: letra,
      seleccionado: selecc
    }
  }
}
