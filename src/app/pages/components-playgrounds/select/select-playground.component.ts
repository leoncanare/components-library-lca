import { Component, OnInit } from '@angular/core';
import { SelectComponent } from '../../../shared/components/select-comp/select.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { PlaygroundPannelComponent } from '../../../shared/playground-pannel/playground-pannel.component';
import { SelectOption } from '../../../shared/models/components.models';
import {
  GenderVariant,
  PaleteVariant,
  PredictiveType,
  SizeVariant,
} from '../../../shared/types/components.types';
import { animalsOptions } from '../../../shared/mocks/selector-options.mock';
import { SpinnerComponent } from '../../../shared/components/spinner-comp/spinner.component';

@Component({
  selector: 'app-select-playground',
  standalone: true,
  imports: [
    SelectComponent,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    PlaygroundPannelComponent,
    SpinnerComponent
  ],
  templateUrl: './select-playground.component.html',
  styleUrls: ['../../../shared/scss/components/_playgrounds.component.scss'],
})
export class SelectPlaygroundComponent implements OnInit {
  loader = false;

  /** PROPIETIES */
  options!: SelectOption[];
  palete: PaleteVariant = 'LCA_PALETE';
  label!: string;
  disabled: boolean = false;
  width: string = '300px';
  size: SizeVariant = 'standard';
  placeholder: string = '';
  helper!: string;
  defaultValue!: string;
  sizeScroll!: number;
  allOption!: boolean;
  shortDropdown: boolean = false;
  gender: GenderVariant = 'm';
  orderAlphabetical: boolean = false;
  description: boolean = false;
  descriptionFilter: boolean = false;
  predictiveType: PredictiveType = 'none';

  animals: SelectOption[] = animalsOptions;

  public animalSelector: FormControl = new FormControl('');

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
        case 'allOption':
          this.allOption = event;
          break;
        case 'gender':
          this.gender = event;
          break;
        case 'orderAlphabetical':
          this.orderAlphabetical = event;
          break;
        default:
          break;
      }
    }, 800);
  }
}
