import { Component, OnInit } from '@angular/core';
import { PlaygroundPannelComponent } from '../../../shared/playground-pannel/playground-pannel.component';
import { NgClass } from '@angular/common';
import { RadioComponent } from '../../../shared/components/radio-comp/radio.component';
import { RadioOption } from '../../../shared/models/components.models';
import { PaleteVariant } from '../../../shared/types/components.types';
import { SpinnerComponent } from '../../../shared/components/spinner-comp/spinner.component';

@Component({
  selector: 'app-select-playground',
  standalone: true,
  imports: [
    RadioComponent,
    PlaygroundPannelComponent,
    NgClass,
    SpinnerComponent
  ],
  templateUrl: './radio-playground.component.html',
  styleUrls: ['../../../shared/scss/components/_playgrounds.component.scss'],
})
export class RadioPlaygroundComponent implements OnInit {
  loader = false;
  palete: PaleteVariant = 'LCA_PALETE';

  radioOptions: RadioOption[] = [
    {
      label: 'Option one',
      value: 'one',
      checked: true,
      disabled: false
    },
    {
      label: 'Option two',
      value: 'two',
      checked: false,
      disabled: false
    },
    {
      label: 'Option three',
      value: 'three',
      checked: false,
      disabled: true
    },
    {
      label: 'Option four',
      value: 'four',
      checked: false,
      disabled: false
    }
  ]

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
