import { Component, OnInit } from '@angular/core';
import { PlaygroundPannelComponent } from '../../../shared/playground-pannel/playground-pannel.component';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button-comp/button.component';
import { DialogComponent } from '../../../shared/components/dialog-comp/dialog.component';
import { PaleteVariant, SizeVariant } from '../../../shared/types/components.types';
import { SpinnerComponent } from '../../../shared/components/spinner-comp/spinner.component';

@Component({
  selector: 'app-dialog-playground',
  standalone: true,
  imports: [
    ButtonComponent,
    DialogComponent,
    PlaygroundPannelComponent,
    NgClass,
    SpinnerComponent
  ],
  templateUrl: './dialog-playground.component.html',
  styleUrls: ['./dialog-playground.component.scss'],
})
export class DialogPlaygroundComponent implements OnInit {
  loader = false;

  dialog: boolean = false;
  ngDialog: boolean = false;

  /** PROPIETIES */
  palete: PaleteVariant = 'LCA_PALETE';
  size!: SizeVariant;
  ngType: boolean = false;
  dialogTimer!: number;
  dialogBackGroundBlock: boolean = false;
  dialogTitle!: string;
  dialogImage!: string;
  dialogText!: string;
  dialogPrimaryBtn: boolean = true;
  dialogPrimaryLabelBtn: string = 'Acept';
  dialogSecondaryBtn: boolean = true;
  dialogSecondaryLabelBtn: string = 'Close';

  constructor() {}

  ngOnInit() {}

  handleShowDialog(): void {
    this.ngType
      ? this.ngDialog = true
      : this.dialog = true;
  }

  refreshCmponent(event: any, varible: string): void {
    this.loader = true;
    
    setTimeout(() => {
      this.loader = false;
      switch (varible) {
        case 'palete':
          this.palete = event;
          break;
      }
    }, 800);
  }
}
