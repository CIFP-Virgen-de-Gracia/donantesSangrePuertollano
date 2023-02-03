import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PaginasModule } from './paginas/paginas.module';
import { AptoSangreComponent } from './apto-sangre/apto-sangre.component';
import { AptoSangreModule } from './apto-sangre/apto-sangre.module';/*
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; */
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AptoSangreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,/*
    NgbModule, */
    SharedModule,
    PaginasModule,
    AptoSangreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
