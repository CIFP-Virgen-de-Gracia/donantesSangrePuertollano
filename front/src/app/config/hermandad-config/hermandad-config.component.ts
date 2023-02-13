import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Integrante } from 'src/app/paginas/interfaces/Paginas.interfaces';

@Component({
  selector: 'app-hermandad-config',
  templateUrl: './hermandad-config.component.html',
  styleUrls: ['./hermandad-config.component.scss']
})
export class HermandadConfigComponent {

  junta!: Integrante[];


  constructor(private SharedService: SharedService) { }

  ngOnInit() {
    this.SharedService.getIntegrantesCargo()
      .subscribe(resp => {
        if (resp.success) {
          this.junta = resp.data;
        }
      });
  }

}
