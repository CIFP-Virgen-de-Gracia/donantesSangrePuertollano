import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserInfo } from '../interfaces/usuarios.interface';
import { UsuariosService } from '../services/usuarios.service';
import { Md5 } from 'ts-md5';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  actualizado!: boolean;
  mensaje: String = '';

  contraErronea = false;
  errorAutenticacion = false;

  info: UserInfo = {
    id: '',
    nombre: '',
    dni: '',
    nDonante: 0,
    gSanguineo: ''
  }

  passwdForm: FormGroup = new FormGroup({
    passwd: new FormControl('', [Validators.required]),
    passwdRep: new FormControl('', [Validators.required]),
    passwdNueva: new FormControl('', [Validators.required])
  });

  infoForm: FormGroup = new FormGroup({
    nombre: new FormControl(this.info.nombre),
    dni: new FormControl(this.info.dni),
    gSanguineo: new FormControl(this.info.gSanguineo),
    nDonante: new FormControl(this.info.nDonante)
    // nTelefono: new FormControl('')
  });

  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.traerInfo();
  }
  

  traerInfo() {
    this.usuariosService.fetchInfoUser().subscribe(resp => {
      if (resp.success) {

        this.info = resp.data;
      }
      else {

        //TODO cartelito de fallo
      }
    });
  }


  cambiarPasswd() {

    if (this.passwdForm.get('passwd')?.value == this.passwdForm.get('passwdRep')?.value) {

      this.contraErronea = false;


      const passwdHash = Md5.hashStr(this.passwdForm.get('passwd')?.value);
      const nuevaPasswdHash = Md5.hashStr(this.passwdForm.get('passwdNueva')?.value);

      this.authService.cambiarPasswd(passwdHash, nuevaPasswdHash).subscribe(resp => {
        if (resp.success) {

          // TODO cartelito de muy bien
        }
        else {
          this.errorAutenticacion = true;
        }
      });
    }
    else {

      this.contraErronea = true;
    }
  }

  updateUser() {

    const valoresOriginales = this.infoForm.value;

    // Subscribe to valueChange to get the changed values
    this.infoForm.valueChanges.subscribe(valoresCambiados => {
      const camposCambiados = {};

      // Loop through the changedValues and compare with the originalValues
      for (const key in valoresCambiados) {
        if (valoresCambiados.hasOwnProperty(key) && valoresCambiados[key] !== valoresOriginales[key]) {
          valoresCambiados[key] = valoresCambiados[key];
        }
        else {
          valoresCambiados[key] = null;
        }
      }

      valoresCambiados.id = this.info.id
      this.usuariosService.updateUser(valoresCambiados).subscribe(resp => {
        // if (resp.success) {

        //   //TODO cartelito de todo bien
        //   this.traerInfo();
        // }
        // else (resp.success) {

        //   // TODO cartelito de fallo
        // }
      });
    });
  }

}
