import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { Email } from '../../interfaces/email.interface';

@Component({
  selector: 'app-email-formulario',
  templateUrl: './email-formulario.component.html',
  styleUrls: ['./email-formulario.component.scss']
})
export class EmailFormularioComponent {

  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter();

  emailForm!: FormGroup;
  mensaje: string = '';
  icono: string = '';


  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])]
    });
  }

  suscribirse() {
    if (this.emailForm.valid) {

      const email: Email = this.emailForm.value;

      this.sharedService.suscripcionNewsletter(email)
        .subscribe(resp => {
          this.mensaje = resp.msg;

          if (resp.success) {
            this.onSubmit.emit(true);
            this.icono = 'fa-circle-check';
            return;
          }
        });

    } else {
      this.mensaje = 'Email no válido';
    }

    this.icono = 'fa-triangle-exclamation';
  }
}
