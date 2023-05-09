import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainStatsComponent } from './main-stats/main-stats.component';
import { StatsRoutingModule } from './stats-routing.module';



@NgModule({
  declarations: [
    MainStatsComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule
  ],
  exports: [
    MainStatsComponent
  ]
})
export class StatsModule { }
