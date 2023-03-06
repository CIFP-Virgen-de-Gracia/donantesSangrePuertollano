import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickyTopDirective } from './sticky-top.directive';



@NgModule({
  declarations: [
    StickyTopDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StickyTopDirective
  ]
})
export class DirectivasModule { }
