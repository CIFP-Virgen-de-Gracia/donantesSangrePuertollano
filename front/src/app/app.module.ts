import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PaginasModule } from './paginas/paginas.module';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { GestionContenidoModule } from './gestion-contenido/gestion-contenido.module';
import { NoticiasRoutingModule } from './gestion-contenido/noticias-routing.module';

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
        GestionContenidoModule,
        NoticiasRoutingModule,
        HttpClientModule,,
        BrowserAnimationsModule,
        AuthModule,
        AuthRoutingModule
    ]
})
export class AppModule {}
