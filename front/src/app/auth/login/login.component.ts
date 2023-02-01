import { Component, Input } from '@angular/core';
import { UserLogin } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  erroneo: boolean = false;

  nuevoUsr: UserLogin = {
    email : '',
    passwd : ''
  };

  constructor(private authHttsService: AuthService) {}

  login() {

    this.nuevoUsr.passwd = Md5.hashStr(this.nuevoUsr.passwd);
    this.authHttsService.login(this.nuevoUsr).subscribe(resp => {

      if (resp.success) localStorage.setItem('user', JSON.stringify(resp.data));
      else this.erroneo = true;
    });
  } 
}
