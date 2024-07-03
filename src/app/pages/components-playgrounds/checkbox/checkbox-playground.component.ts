import { Component, OnInit } from '@angular/core';
import { PlaygroundPannelComponent } from '../../../shared/playground-pannel/playground-pannel.component';
import { CheckboxComponent } from '../../../shared/components/checkbox-comp/checkbox.component';
import { NgClass } from '@angular/common';
import { PaleteVariant } from '../../../shared/types/components.types';
import { SpinnerComponent } from '../../../shared/components/spinner-comp/spinner.component';

@Component({
  selector: 'app-select-playground',
  standalone: true,
  imports: [
    CheckboxComponent,
    PlaygroundPannelComponent,
    NgClass,
    SpinnerComponent
  ],
  templateUrl: './checkbox-playground.component.html',
  styleUrls: ['../../../shared/scss/components/_playgrounds.component.scss'],
})
export class CheckboxPlaygroundComponent implements OnInit {
  loader = false;

  /** PROPIETIES */
  palete: PaleteVariant = 'LCA_PALETE';
  label: string = 'button';
  disabled: boolean = false;
  checked: boolean = false;
  secondary: boolean = false;

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
