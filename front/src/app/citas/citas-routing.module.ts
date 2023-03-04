import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarCitasComponent } from './mostrar-citas/mostrar-citas.component';
import { PedirCitaPacienteComponent } from './pedir-cita-paciente/pedir-cita-paciente.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'pedircita', component: PedirCitaPacienteComponent },
      { path: 'mostrarcitas', component: MostrarCitasComponent},
      { path: '**', redirectTo: 'pedircita'}
    ]
  }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})

export class PedirCitaRoutingModule { }