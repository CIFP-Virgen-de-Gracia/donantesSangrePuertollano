import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/paginas.module').then( m => m.PaginasModule )
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./gestion-contenido/gestion-contenido.module').then( m => m.GestionContenidoModule )
  },
  {
    path: '**',
    redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
