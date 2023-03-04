import { Component } from '@angular/core';
import { Cargo } from '../interfaces/config.interface';
import { Integrante } from 'src/app/shared/interfaces/shared.interface';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ConfigService } from '../services/config.service';
import { SharedService } from 'src/app/shared/services/shared.service';


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
    toolbarHiddenButtons: [['fontName']]
  };


  junta: Integrante[] = [];
  historia: String = '';
  cargos: Cargo[] = [];
  mensaje: String = '';
  actualizado!: boolean;

  constructor(
    private SharedService: SharedService,
    private ConfigService: ConfigService
  ) { }


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

    this.ConfigService.getCargosJunta()
      .subscribe(resp => {
        if (resp.success) {
          this.cargos = resp.data;
        }
      });
  }


  guardar() {
    this.ConfigService.updateHermandad(this.historia, this.junta)
      .subscribe(resp => {

        this.mensaje = resp.msg;
        this.actualizado = (resp.success) ? true : false;

        setTimeout(() => this.mensaje = '', 4000);

      });
  }
}
