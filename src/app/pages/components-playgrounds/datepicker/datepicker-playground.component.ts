import { Component, OnInit } from '@angular/core';
import { PlaygroundPannelComponent } from '../../../shared/playground-pannel/playground-pannel.component';
import { NgClass } from '@angular/common';
import { AlignVariant, PaleteVariant } from '../../../shared/types/components.types';
import { DatepickerComponent } from '../../../shared/components/date-picker-comp/datepicker.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/components/spinner-comp/spinner.component';

@Component({
  selector: 'app-select-playground',
  standalone: true,
  imports: [
    DatepickerComponent,
    PlaygroundPannelComponent,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    SpinnerComponent
  ],
  templateUrl: './datepicker-playground.component.html',
  styleUrls: ['../../../shared/scss/components/_playgrounds.component.scss'],
})
export class DatepickerPlaygroundComponent implements OnInit {
  loader = false;

  /** PROPIETIES */
  palete: PaleteVariant = 'LCA_PALETE';
  label!: string;
  disabled: boolean = false;
  width: string = '300px';
  placeholder: string = '';
  helper!: string;
  defaultValue!: string;

  public testDatePicker: FormControl = new FormControl('');

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
