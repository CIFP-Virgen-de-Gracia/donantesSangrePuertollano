import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { NombreCompleto, UserRegsitro } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  nuevoUsrReg: UserRegsitro = {
    email: '',
    nombre: '',
    passwd: ''
  }

  nombreCompleto: NombreCompleto =  {
    nombre: '',
    ap1: '',
    ap2: ''
  }
  
  contraRep: string = ''
  contraErronea: boolean = false;

  registroForm!: FormGroup;

  constructor(
    private authHttsService: AuthService,
    private router: Router,
    ) {}

    ngOnInit() {
      this.contraErronea = false;

      this.registroForm = new FormGroup({
        'nombre': new FormControl('', [Validators.required]),
        'ap1': new FormControl('', [Validators.required]),
        'ap2': new FormControl('', [Validators.required]),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'passwd': new FormControl('', [Validators.required]),
        'passwdRep': new FormControl('', [Validators.required])
      });
    }

  registro() {

    console.log(this.registroForm);
    console.log(this.registroForm);

    this.nuevoUsrReg.nombre = this.nombreCompleto.nombre + ' '
      + this.nombreCompleto.ap1 + ' ' 
      + this.nombreCompleto.ap2;

    if (this.nuevoUsrReg.passwd == this.contraRep) {
      
      const passwdHash = Md5.hashStr(this.nuevoUsrReg.passwd);

      this.authHttsService.registro({
        email: this.nuevoUsrReg.email,
        nombre: this.nuevoUsrReg.nombre,
        passwd: passwdHash
      }).subscribe(resp => {

        if (resp.success) {

        }
      });
    }
    else {
      this.contraErronea = true;
    }
  }
}
