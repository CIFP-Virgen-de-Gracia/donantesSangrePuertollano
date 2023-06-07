import { Component } from '@angular/core';
import { Direccion, Horario, HorarioMostrar } from 'src/app/config/interfaces/config.interface';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  direcciones: Direccion[] = [];
  horarios: Horario[] = [];
  hMostrar: HorarioMostrar[] = [];
  citaPedida: number = -1;

  constructor(private SharedService: SharedService) { }

  //Alicia
  ngOnInit() {
    this.SharedService.citaPedida.subscribe(resp => {
      this.citaPedida = resp;
    });


    this.SharedService.getHorarios().subscribe(resp => {
      if (resp.success) this.horarios = resp.data;
    });


    this.SharedService.getDirecciones().subscribe(resp => {
      if (resp.success) this.direcciones = resp.data;
    });
  }
}
