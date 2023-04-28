import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPedirCitaComponent } from '../modal-pedir-cita/modal-pedir-cita.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from '../services/shared.service';
import { CitasService } from 'src/app/citas/services/citas.service';
import { lastValueFrom } from 'rxjs';
import { PedirCitaModule } from 'src/app/citas/citas.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('banner') banner!: ElementRef<HTMLElement>;

  fijo: boolean = false;
  puedeModificar: boolean = false;
  estaRegistrado: boolean = false;
  puedePedirCita: boolean = true;


  constructor(
    private AuthService: AuthService,
    private SharedService: SharedService,
    private router: Router,
    private modal: NgbModal,
    private citasService: CitasService
  ) { }


  ngOnInit() {
    const user = localStorage.getItem('user');

    if (user) {
      this.estaRegistrado = true;

      this.comprobarPuedeModificar();
    }

    this.SharedService.comprobarPermisos.subscribe(registrado => {
      this.estaRegistrado = registrado;

      this.comprobarPuedeModificar();
    })
  }


  posicionarMenu() {
    const altBanner = this.banner.nativeElement.offsetHeight;
    const scrollActual = window.scrollY;

    this.fijo = (scrollActual >= altBanner) ? true : false;
  }


  @HostListener("window:scroll", ['$event'])
  handleScroll($event: Event) {
    this.posicionarMenu();
  }


 /*  @HostListener("window:resize", ['$event'])
  handleResize($event: Event) {

  } */


  comprobarPuedeModificar() {
    if (this.estaRegistrado) {
      this.AuthService.puedeModificar().subscribe(resp => {
        this.puedeModificar = (resp) ? true : false;
      });
    }
  }


  async ensenarModal() {
    this.modal.open(ModalPedirCitaComponent);
  }

  // async ensenarModalPedirCita() {

  //   if(this.estaRegistrado) {
  //     const id = JSON.parse(localStorage.getItem('user')!).id

  //     const resp = await lastValueFrom(this.citasService.compHaPedidoCita(id));

  //     this.puedePedirCita = resp.success;
  //   }

  //   // this.modal.open(ModalPedirCitaComponent, this.estaRegistrado, this.puedePedirCita);
  // }

  //TODO: sacar cuadro preguntando

  // ensenarModal() {
  //   if (!this.estaRegistrado) this.modal.open(ModalPedirCitaComponent);
  //   else this.router.navigate(['/citas/pedircita']);
  // }

  cerrarSesion() {
    localStorage.removeItem('user');
    this.estaRegistrado = false;
    this.puedeModificar = false;
    this.router.navigate(['']);
  }


}
