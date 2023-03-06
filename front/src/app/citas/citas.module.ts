import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedirCitaPacienteComponent } from './pedir-cita-paciente/pedir-cita-paciente.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { PedirCitaRoutingModule } from './citas-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MostrarCitasComponent } from './mostrar-citas/mostrar-citas.component';


@NgModule({
  declarations: [
    PedirCitaPacienteComponent,
    MostrarCitasComponent,
  ],
  imports: [
    CommonModule,
    PedirCitaRoutingModule,
    ReactiveFormsModule,
    DatePickerComponent
  ]
}) 
export class PedirCitaModule { }
