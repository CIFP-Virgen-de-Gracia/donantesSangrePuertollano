import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {

  @ViewChild('newsletter') newsletter!: ElementRef<HTMLDivElement>;

  cerrar() {
    this.newsletter.nativeElement.remove();
  }
}
