import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-formulario',
  templateUrl: './email-formulario.component.html',
  styleUrls: ['./email-formulario.component.scss']
})
export class EmailFormularioComponent {

  @Output() onSubmit:EventEmitter<boolean> = new EventEmitter();

  emailForm!:FormGroup;
  valido:boolean = true;

  constructor(private fb:FormBuilder) { }

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
      this.valido = true;
      this.onSubmit.emit(true);
      console.log('Form submitted!');
    } else {
      this.valido = false;
      console.log('no');
    }
  }
}
