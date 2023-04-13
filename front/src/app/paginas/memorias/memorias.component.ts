import { Component, OnInit } from '@angular/core';
import { Memoria } from '../interfaces/paginas.interface';
import { PaginasService } from '../services/paginas.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { entradaSalidaVentana } from 'src/app/shared/animaciones/animaciones';

export const tiempoAnimacion = 250;

@Component({
  selector: 'app-memorias',
  templateUrl: './memorias.component.html',
  styleUrls: ['./memorias.component.scss'],
  animations: [ entradaSalidaVentana ]
})
export class MemoriasComponent implements OnInit {

  timer: NodeJS.Timeout | undefined;
  codBorrar: number = -1;
  estaRegistrado: boolean = false;
  puedeModificar: boolean = false;
  memorias: Memoria[] = [];

  constructor(
    private PaginasService: PaginasService,
    private AuthService: AuthService
  ) { }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.estaRegistrado = true;

      this.comprobarPuedeModificar();
    }

    this.PaginasService.getMemorias()
      .subscribe(resp => {

        if (resp.success) {
          this.memorias = resp.data;
        }
      });
  }


  editarMemoria(id: number) {

  }


  borrarMemoria(index: number) {
    this.PaginasService.borrarMemoria(this.memorias[index].id)
      .subscribe(resp => {

        if (resp.success) {
          this.memorias.splice(index, 1);
          this.codBorrar = 0;

        } else {
          this.codBorrar = 1;
        }

        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.codBorrar = -1, 4000);
      });
  }


  comprobarPuedeModificar() {
    if (this.estaRegistrado) {
      this.AuthService.puedeModificar().subscribe(resp => {
        this.puedeModificar = (resp) ? true : false;
      });
    }
  }
}
