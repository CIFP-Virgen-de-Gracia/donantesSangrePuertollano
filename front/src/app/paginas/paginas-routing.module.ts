import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LaHermandadComponent } from './la-hermandad/la-hermandad.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HimnoComponent } from './himno/himno.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { ChatComponent } from './chat/chat.component';
import { MemoriasComponent } from './memorias/memorias.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'hermandad', component: LaHermandadComponent },
      { path: 'himnos', component: HimnoComponent },
      { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent },
      { path: 'chat-dudas', component: ChatComponent },
      { path: 'memorias', component: MemoriasComponent },
      { path: 'estadisticas', component: EstadisticasComponent }
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
