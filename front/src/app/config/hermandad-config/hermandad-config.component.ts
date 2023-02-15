import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Integrante } from 'src/app/paginas/interfaces/Paginas.interfaces';

@Component({
  selector: 'app-hermandad-config',
  templateUrl: './hermandad-config.component.html',
  styleUrls: ['./hermandad-config.component.scss']
})
export class HermandadConfigComponent {

  editorTextoConfig: AngularEditorConfig = {
    editable: true,
    height: '400px',
    minHeight: '400px',
    maxHeight: '400px',
    width: '100%',
    minWidth: '100%',
    defaultParagraphSeparator: '',
    outline: false,
    sanitize: true,
    toolbarHiddenButtons: [ [ 'fontName' ] ]
  };


  junta!: Integrante[];
  historia: String = '';


  constructor(private SharedService: SharedService) { }

  ngOnInit() {
    this.SharedService.getIntegrantesCargo()
      .subscribe(resp => {
        if (resp.success) {
          this.junta = resp.data;
        }
      });

    this.SharedService.getHistoria()
      .subscribe(resp => {
        if (resp.success) {
          this.historia = resp.data.valor;
        }
      });
  }


  guardar() {
    this.SharedService.updateConfigHermandad()
      .subscribe( resp => {
        if (resp.success) {
          console.log('ok')
        } else {
          console.log(':(')
        }
      });
  }
}
