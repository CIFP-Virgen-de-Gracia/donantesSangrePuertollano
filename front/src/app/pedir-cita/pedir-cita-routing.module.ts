import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { PedirCitaPacienteComponent } from './pedir-cita-paciente/pedir-cita-paciente.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'pedircita', component: PedirCitaPacienteComponent },
      { path: 'calendario', component: DatePickerComponent },
      { path: '**', redirectTo: 'pedircita'}
    ]
  }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})

export class PedirCitaRoutingModule { }