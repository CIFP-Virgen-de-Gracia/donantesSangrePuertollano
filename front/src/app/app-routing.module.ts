import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { AptoSangreComponent } from './apto-sangre/apto-sangre.component';
import { ResultadoComponent } from './apto-sangre/resultado/resultado.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/paginas.module').then( m => m.PaginasModule )
  },
  {
    path: 'test-apto',
    component: AptoSangreComponent
  },
  {
    path: 'resultado',
    component: ResultadoComponent
  },
  {
    path: '**',
    redirectTo: ''
  }

  /* ,
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
