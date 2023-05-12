import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraficosComponent } from './graficos/graficos.component';
import { RegistrarDatosComponent } from './registrar-datos-main/registrar-datos-main.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: GraficosComponent },
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
