import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { LaHermandadService } from '../services/la-hermandad.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { entradaSalidaVentana } from 'src/app/shared/animaciones/animaciones';


@Component({
  selector: 'app-config-historia',
  templateUrl: './config-historia.component.html',
  styleUrls: ['./config-historia.component.scss'],
  animations: [ entradaSalidaVentana ]
})
export class ConfigHistoriaComponent { //Alicia

  @ViewChild('closeModal') closeModal!: ElementRef;

  timer: NodeJS.Timeout | undefined;
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
  historia: string = '';
  mensaje: string = '';
  codAccion = -1;
  accion: string = 'editar';

  constructor(
    private SharedService: SharedService,
    private HermandadService: LaHermandadService
  ) {}


  ngOnInit() {
    this.SharedService.getHistoria()
      .subscribe(resp => {
        if (resp.success) this.historia = resp.data.valor;
      });
  }


  updateHistoria() {
    this.HermandadService.updateHistoria(this.historia)
      .subscribe(resp => {

        if (resp.success && resp.historia) {
          console.log(resp)
          this.historia = resp.historia;
          this.codAccion = 0;

        } else this.codAccion = 1;

        this.setTimer(4000);
        this.closeModal.nativeElement.click();
      })
  }

  setTimer(tiempo: number) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.codAccion = -1, tiempo);
  }
}
