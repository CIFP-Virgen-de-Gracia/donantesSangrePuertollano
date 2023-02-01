import { Component, Input } from '@angular/core';
import { UsuarioLogin } from '../interfaces/usuarios.interface';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Input() nuevoUsr: UsuarioLogin = {
    email : '',
    passwd : ''
  }

  constructor(private usuariosService: UsuariosService) {}

  login() {
    if (this.usuariosService.login(this.nuevoUsr)) // guardar ls y redireccionar

    this.nuevoUsr = {email: '', passwd: ''};
  }
}
