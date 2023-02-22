import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AptoSangreComponent } from './apto-sangre/apto-sangre.component';
import { ResultadoComponent } from './apto-sangre/resultado/resultado.component';
import { AvisoComponent } from './apto-sangre/aviso/aviso.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/paginas.module').then( m => m.PaginasModule )
  },
  {
    path: 'aviso',
    component: AvisoComponent
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
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./gestion-contenido/gestion-contenido.module').then( m => m.GestionContenidoModule )
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./config/config.module').then( m => m.ConfigModule ),
    canMatch: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  },
  {
    path: '**',
    loadChildren: () => import('./paginas/paginas.module').then( m => m.PaginasModule )
  }

  /* ,
  {
    path: '404',
    component: ErrorPageComponent
  }*/

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
