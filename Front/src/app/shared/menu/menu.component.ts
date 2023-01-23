import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  menuFijo: boolean = false;

  @HostListener("window:scroll", []) onWindowScroll() {
    const banner = document.querySelector(".banner")! as HTMLElement;
    const tam = banner.offsetHeight;

    window.scrollY >= tam ? this.menuFijo = true : this.menuFijo = false;
  }
}
