import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  puedeModificar: boolean = false;
  estaRegistrado: boolean = false;

  constructor(
    private SharedService: SharedService,
    private router: Router
  ) { }


  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        const user = localStorage.getItem('user');

        if (user) {
          this.estaRegistrado = true;

          this.SharedService.puedeModificar(JSON.parse(user!).id).subscribe(resp => {
            this.puedeModificar = (resp.success) ? true : false;
          });
        }
      }
    });
  }
}
