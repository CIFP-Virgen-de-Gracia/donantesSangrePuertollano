import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-registrar-altas',
  templateUrl: './registrar-altas.component.html',
  styleUrls: ['./registrar-altas.component.scss']
})
export class RegistrarAltasComponent {

  timer: NodeJS.Timeout | undefined;
  fecha?: NgbDateStruct;
  registrada: boolean = false;
  altas?: number;
  mensaje: string;
  errorAltas?: boolean;
  errorFecha?: boolean;

  constructor(private StatsService: StatsService) {
    this.mensaje = '';
  }


  onSubmit(form: NgForm) {
    if (!form.value.altas) this.errorAltas = true;
    else if (!this.fecha) this.errorFecha = true;
    else {
      const payload = form.value;
      payload.fecha = `${this.fecha.year}-${this.fecha.month}-${this.fecha.day}`;

      this.StatsService.insertAltas(payload)
        .subscribe(resp => {
          if (resp.success) this.registrada = true;
          else this.registrada = false;

          this.mensaje = resp.msg;
          this.errorAltas = false;
          this.errorFecha = false;
        });

      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.mensaje = '', 4000);
    }
  }


  setDia(fecha: NgbDateStruct) {
    this.fecha = fecha;
  }
}
