import { Component, OnInit } from '@angular/core';
import { PaginasService } from '../services/paginas.service';

@Component({
  selector: 'app-himno',
  templateUrl: './himno.component.html',
  styleUrls: ['./himno.component.scss']
})
export class HimnoComponent implements OnInit {
  constructor(private PaginasService: PaginasService) { }

  ngOnInit() {
    this.PaginasService.getListado().subscribe((res) => {
      console.log(res);
    });
  }
  get resultado() {
    return this.PaginasService.result;
  }


}
