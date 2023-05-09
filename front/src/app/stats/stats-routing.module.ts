import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { MainStatsComponent } from './main-stats/main-stats.component';

const routes: Routes = [
  {
    path: '',
    component: MainStatsComponent,
    children: [
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
