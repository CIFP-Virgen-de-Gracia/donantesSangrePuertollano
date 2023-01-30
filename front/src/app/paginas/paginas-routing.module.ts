import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      /* { path: 'listado', component: ListadoComponent } */
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
export class PaginasRoutingModule{ }
