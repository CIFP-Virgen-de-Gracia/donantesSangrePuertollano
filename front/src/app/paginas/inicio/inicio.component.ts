import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  citaPedida: number = -1;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {

      this.sharedService.citaPedida.subscribe(resp => {
      this.citaPedida = resp;
    });
  }
}
