import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LaHermandadComponent } from './la-hermandad/la-hermandad.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HimnoComponent } from './himno/himno.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'hermandad', component: LaHermandadComponent },
      { path: 'himnos', component: HimnoComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PaginasRoutingModule{ }
