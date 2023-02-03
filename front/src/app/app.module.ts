import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PaginasModule } from './paginas/paginas.module';
<<<<<<< HEAD
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
=======
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        PaginasModule,
        SharedModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AuthModule,
        AuthRoutingModule
    ]
>>>>>>> develop
})
export class AppModule {}