import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appStickyTop]'
})
export class StickyTopDirective {
  // Fuente código http://blog.enriqueoriol.com/2018/07/como-crear-un-elemento-sticky-en-angular.html

  private posicionElementoOriginal = 0;

  constructor(
    private elemento: ElementRef,
    private renderer: Renderer2
  ) {
    this.getPosicionElemento();
  }

  private getPosicionElemento() {
    //Necesito saber a qué distancia está el elemento de la parte superior de la ventana.
    let distanciaVentanaElemento = this.elemento.nativeElement.getBoundingClientRect().top;
    let scrollActual = window.scrollY;
    this.posicionElementoOriginal = distanciaVentanaElemento + scrollActual;
  }

  @HostListener("window:scroll", ['$event'])
  private handleScroll($event: Event) {
    const scrollActual = window.scrollY;

    if (scrollActual >= this.posicionElementoOriginal) {
      this.renderer.addClass(this.elemento.nativeElement, 'fijo');
    } else if (scrollActual < this.posicionElementoOriginal) {
      this.renderer.removeClass(this.elemento.nativeElement, 'fijo');
    }
  }
}
