import { Component, OnInit } from '@angular/core';
import { PlaygroundPannelComponent } from '../../../shared/playground-pannel/playground-pannel.component';
import {
  ButtonVariant,
  PaleteVariant,
  SizeVariant,
  TextVariant,
} from '../../../shared/types/components.types';
import { ButtonComponent } from '../../../shared/components/button-comp/button.component';
import { SpinnerComponent } from '../../../shared/components/spinner-comp/spinner.component';

@Component({
  selector: 'app-select-playground',
  standalone: true,
  imports: [
    ButtonComponent,
    PlaygroundPannelComponent,
    SpinnerComponent
  ],
  templateUrl: './button-playground.component.html',
  styleUrls: ['../../../shared/scss/components/_playgrounds.component.scss'],
})
export class ButtonPlaygroundComponent implements OnInit {
  loader = false;

  /** PROPIETIES */
  palete: PaleteVariant = 'LCA_PALETE';
  label: string = 'button';
  disabled: boolean = false;
  width!: string;
  size: SizeVariant = 'standard';
  variant: ButtonVariant = 'primary';
  textStyle: TextVariant = 'uppercase';
  icon!: string;

  constructor() {}

  ngOnInit() {}

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
