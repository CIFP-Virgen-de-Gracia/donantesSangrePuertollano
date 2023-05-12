import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-registrar-donaciones',
  templateUrl: './registrar-donaciones.component.html',
  styleUrls: ['./registrar-donaciones.component.scss']
})
export class RegistrarDonacionesComponent {

  timer: NodeJS.Timeout | undefined;
  fecha?: NgbDateStruct;
  tiposDonacion = ['sangre', 'plasma', 'médula', 'órganos'];
  grpsSanguineos = ['A+', 'A-', 'B+', 'B-', 'B+', 'AB-', '0+', '0-'];
  generos = ['hombre', 'mujer'];
  registrada: boolean = false;
  tipoDonacion: string;
  gSanguineo: string;
  nDonante: string;
  genero: string;
  mensaje: string;


  constructor(private StatsService: StatsService) {
    this.tipoDonacion = this.tiposDonacion[0];
    this.gSanguineo = this.grpsSanguineos[0];
    this.genero = this.generos[0];
    this.nDonante = '';
    this.mensaje = '';
  }


  onSubmit(form: NgForm) {
    if (this.fecha) {

      const payload = form.value;
      payload.fecha = `${this.fecha.year}-${this.fecha.month}-${this.fecha.day}`;
      console.log(payload.fecha)
      this.StatsService.insertDonacion(payload)
        .subscribe(resp => {
          if (resp.success) this.registrada = true;
          else this.registrada = false;

          this.mensaje = resp.msg;

        });

    } else {
      this.mensaje = 'Debes seleccionar una fecha.';
    }

    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.mensaje = '', 4000);
  }


  formatFecha(fecha: NgbDateStruct) {
  }


  setDia(fecha: NgbDateStruct) {
    this.fecha = fecha;
  }
}
