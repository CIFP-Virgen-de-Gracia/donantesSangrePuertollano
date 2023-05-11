import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { MainStatsComponent } from './main-stats/main-stats.component';
import { RegistrarDatosComponent } from './registrar-datos/registrar-datos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MainStatsComponent},
      { path: 'registrar-datos', component: RegistrarDatosComponent},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class StatsRoutingModule { }
