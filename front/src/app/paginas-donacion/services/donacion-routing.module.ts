import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DonacionSangreComponent } from '../donacion-sangre/donacion-sangre.component';
import { MainPageComponent } from '../main-page/main-page.component';
const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: 'sangre', component: DonacionSangreComponent },
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
export class AppRoutingModule { }
