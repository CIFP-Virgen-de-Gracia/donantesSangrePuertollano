import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/paginas.module').then( m => m.PaginasModule )
  },
  {
    path: '**',
    redirectTo: ''
  }/* ,
  {
    path: 'paginas',
    loadChildren: () => import('./paginas/paginas.module').then( m => m.PaginasModule )
  } *//* ,
  {
    path: '404',
    component: ErrorPageComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
