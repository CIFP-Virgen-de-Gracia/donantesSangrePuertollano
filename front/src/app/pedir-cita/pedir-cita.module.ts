import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedirCitaPacienteComponent } from './pedir-cita-paciente/pedir-cita-paciente.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { PedirCitaRoutingModule } from './pedir-cita-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    PedirCitaPacienteComponent,
  ],
  imports: [
    CommonModule,
    PedirCitaRoutingModule,
    ReactiveFormsModule,
    DatePickerComponent,
    ModalComponent
  ]
}) 
export class PedirCitaModule { }
