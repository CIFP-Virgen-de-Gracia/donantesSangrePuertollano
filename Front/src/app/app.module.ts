import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AptoSangreModule } from './apto-sangre/apto-sangre.module';
import { AptoSangreComponent } from './apto-sangre/apto-sangre.component';

@NgModule({
  declarations: [
    AppComponent,
    AptoSangreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AptoSangreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
