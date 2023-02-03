import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-main-auth',
  templateUrl: './main-auth.component.html',
  styleUrls: ['./main-auth.component.scss']
})
export class MainAuthComponent implements OnInit{

  accion: string = 'login';
  registradoExito: number = -1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.includes('login')) {
      this.accion = 'login';
    }
    else {
      this.accion = 'registro';
      this.registradoExito = -1;
    }
  }

  // public get registradoExito() : boolean {
  //   return this.registradoExito
  // }
  
  showAlert(event : number) {
    this.registradoExito = event;
  }

  irAlLogin() {
    this.router.navigate(['auth/login']);
  }
}
