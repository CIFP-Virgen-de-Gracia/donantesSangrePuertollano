import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-passwd',
  templateUrl: './recuperar-passwd.component.html',
  styleUrls: ['./recuperar-passwd.component.scss']
})
export class RecuperarPasswdComponent {

  emailRecPasswdEnviado: number = -1;
  codRecPasswd: number = -1;

  constructor(
    private authHttsService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    
    this.emailRecPasswdEnviado = -1;
    this.codRecPasswd = -1;
  }

  @Output() onRecPasswd: EventEmitter<number> = new EventEmitter();

  emailRecPasswdForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });

  codForm: FormGroup = new FormGroup({
    cod: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });


  mandarEmailRecPasswd() {
    this.authHttsService.solicitarRecPasswd(this.emailRecPasswdForm.get('email')?.value).subscribe(resp => {
      console.log(resp);
      if (resp.success) {

        localStorage.setItem('user', JSON.stringify({id: resp.id}));
        this.emailRecPasswdEnviado = 0;
        this.codRecPasswd = 2;
      }
      else {
        this.emailRecPasswdEnviado = 1;
        this.codRecPasswd = 3;
      }

    });
  }


  recuperarPasswd() {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.authHttsService.recuperarPasswd(user.id, this.codForm.get('cod')?.value).subscribe(resp => {
      console.log(resp);
      if (resp.success) {

        this.codRecPasswd = 0;
      }
      else {
        this.codRecPasswd = 1;
      }
    });

  }

  irAlLogin() {
    this.router.navigate(['/auth/login']);
  }
}
