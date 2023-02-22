import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { PedirCitaService } from '../services/pedir-cita.service';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-pedir-cita-paciente',
  templateUrl: './pedir-cita-paciente.component.html',
  styleUrls: ['./pedir-cita-paciente.component.scss'],
})
export class PedirCitaPacienteComponent {

  @Output() onCitaPedida: EventEmitter<boolean> = new EventEmitter();

  fecha: NgbDateStruct;
  sinSeleccionar = true;
  registrado: boolean = false;
  noHayHoras: boolean = false
  horasDisponibles: string[] = [];
  fechaSeleccionada: string;

  citaForm: FormGroup = new FormGroup({
    hora: new FormControl('', [Validators.required])
  });

  constructor(
    private pedirCitaHttpService: PedirCitaService,
    private calendar: NgbCalendar,
    private modal: NgbModal,
    private router: Router
    ) {}

  ngOnInit() {
    this.sinSeleccionar = true;
    this.fecha = this.calendar.getToday();
    this.transFecha(this.fecha);
    this.compRegistro();
  }


  // ensenarModal() {
  //   this.modal.open(, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }


  compRegistro() {
     this.registrado = localStorage.getItem('user') != null;
     console.log(this.registrado);
  }

  transFecha(fechaCalendar: NgbDateStruct) {
    this.fechaSeleccionada = this.fecha.year + '-' + this.fecha.month + '-' + this.fecha.day;
  }

  traerHorario() {
    this.pedirCitaHttpService.fetchHorasDisponibles(this.fechaSeleccionada).subscribe(resp => {
      this.horasDisponibles = resp.horas;
      if (this.horasDisponibles.length == 0) this.noHayHoras = true;
    });
  }

  setDia(event: NgbDateStruct) {
    this.fecha = event;
    this.transFecha(this.fecha);
    this.traerHorario();
    this.sinSeleccionar = false;
  }

  pedirCita() {
    const id = JSON.parse(localStorage.getItem('user') || '{}');

    const fechaCita = this.fechaSeleccionada
      + ' ' + this.citaForm.get('hora')?.value + ':00';

    console.log(fechaCita);

    this.pedirCitaHttpService.insertCita(id, fechaCita).subscribe(resp => {
      this.onCitaPedida.emit(true);

      // const {id: value}: Storage = localStorage;

      this.pedirCitaHttpService.mandarCorreo(id, this.fechaSeleccionada).subscribe(resp => {
        console.log(resp);
        // this.router.navigate(['']);
      });
    });
  }
}
