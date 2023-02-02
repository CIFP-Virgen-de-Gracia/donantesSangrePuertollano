import { Component, OnInit } from '@angular/core';
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
  // registradoExito
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.includes('login')) {
      this.accion = 'login';
    }
    else {
      this.accion = 'registro';
      // this.registradoExito = false;
    }
  }

  // public get registradoExito() : boolean {
  //   return this.registradoExito
  // }
  
  irAlLogin() {
    this.router.navigate(['auth/login']);
  }
}
