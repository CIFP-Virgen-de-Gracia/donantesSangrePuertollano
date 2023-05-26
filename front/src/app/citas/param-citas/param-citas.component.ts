import { Component, Renderer2, ElementRef } from '@angular/core';
import { CitasService } from '../services/citas.service';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-param-citas',
  templateUrl: './param-citas.component.html',
  styleUrls: ['./param-citas.component.scss']
})
export class ParamCitasComponent {
  divCount = 0;
  horas: string[] = [];
  time = { hour: 13, minute: 30 };

  constructor(
    private renderer: Renderer2, 
    private el: ElementRef,
    private citasService: CitasService,
  ) {}

  ngOnInit() {

    this.traerHoras();
  }


  traerHoras() {
    this.citasService.fetchHorasCitas().subscribe(resp => {
      if (resp.success) {
        this.horas.length = 0;
        this.horas = resp.horas.map(hora => hora.substring(0, 5));
      }
      else {
        // TODO cartelito de fallo
      }
    });
  }


  quitar(index: number) {

    this.citasService.deleteHoraCita(this.horas[index] + ':00').subscribe(resp => {
      if (resp.success) {
        this.traerHoras();
      }
      else {
        // TODO cartelito de fallo
      }
    });
    this.horas.splice(index, 1);
  }


  anadirHora() {
    const horaAnadir = this.time.hour + ':' + this.time.minute;
    let anadir = true;
    
    this.horas.map(hora => {if (hora == horaAnadir) {anadir = false; return;}});

    this.citasService.insertHoraCita(horaAnadir + ':00').subscribe(resp => {
      
      if (anadir && resp.success) {
        // this.horas.push(this.time.hour + ':' + this.time.minute);
        // this.horas.sort((a, b) => {
        //   const time1 = new Date("1970-01-01T" + a + ":00Z");
        //   const time2 = new Date("1970-01-01T" + b + ":00Z");
    
        //   return time1.getTime() - time2.getTime();
        // });
        
        this.traerHoras();
      }
      else {
  
        //TODO cartelito de fallo
      }
    });
  }
}
