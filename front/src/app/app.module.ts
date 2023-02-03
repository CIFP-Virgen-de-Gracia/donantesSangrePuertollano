import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { PaginasModule } from './paginas/paginas.module';
// import { SharedModule_1 as SharedModule } from "./shared/shared.module";
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestionContenidoModule } from './gestion-contenido/gestion-contenido.module';
import { NoticiasRoutingModule } from './gestion-contenido/noticias-routing.module';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        UsuariosModule,
        FormsModule,
        PaginasModule,
        SharedModule,
        GestionContenidoModule,
        NoticiasRoutingModule,
        HttpClientModule,
    ]
})
export class AppModule {}
