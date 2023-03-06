import { Component } from '@angular/core';
import { UserLogin } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  erroneo: boolean = false;

  nuevoUsr: UserLogin = {
    email: '',
    passwd: ''
  };

  constructor(
    private authHttsService: AuthService,
    private SharedService: SharedService,
    private router: Router
  ) { }

  irARegistro() {
    this.router.navigate(['/auth/registro']);
  }

  login() {

    const passwd = Md5.hashStr(this.nuevoUsr.passwd);
    this.authHttsService.login({ email: this.nuevoUsr.email, passwd: passwd }).subscribe(resp => {

      if (resp.success) {
        localStorage.setItem('user', JSON.stringify(resp.data));
        this.erroneo = false;
        this.SharedService.comprobarPermisos.next(!this.erroneo);
        this.router.navigate(['']);
      }
      else this.erroneo = true;
    });
  }

  irARecPasswd() {
    this.router.navigate(['/auth/recuperacionpasswd']);
  }
}
