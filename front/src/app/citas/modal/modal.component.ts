import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
	imports: [NgbDatepickerModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  closeResult = '';
  
  @ViewChild('content') content!: ElementRef;
	
  constructor(
    private modalService: NgbModal,
    private router: Router) {}


  ngAfterViewInit() {
    this.openModal();
  }

  openModal(){
    this.modalService.open(this.content, { centered: true });
  }

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
			}
		);
	}

  irAlLogin() {
    this.router.navigate(['/auth/login']);
  }

  irAPagPrincipal() {
    this.router.navigate(['']);
  }

}
