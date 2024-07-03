import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { PlaygroundPannelComponent } from '../../../shared/playground-pannel/playground-pannel.component';
import { SpinnerComponent } from '../../../shared/components/spinner-comp/spinner.component';
import { InputComponent } from '../../../shared/components/input-comp/input.component';
import { AlignVariant, PaleteVariant, SizeVariant } from '../../../shared/types/components.types';

@Component({
  selector: 'app-input-playground',
  standalone: true,
  imports: [
    InputComponent,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    PlaygroundPannelComponent,
    SpinnerComponent
  ],
  templateUrl: './input-playground.component.html',
  styleUrls: ['../../../shared/scss/components/_playgrounds.component.scss'],
})
export class InputPlaygroundComponent implements OnInit {
  loader = false;

  /** PROPIETIES */
  palete: PaleteVariant = 'LCA_PALETE';
  label!: string;
  disabled: boolean = false;
  width: string = '300px';
  size: SizeVariant = 'standard';
  placeholder: string = '';
  helper!: string;
  defaultValue!: string;
  prefix!: string;
  suffix!: string;
  maxLength: number = 65;

  tooltipTitle!: string;
  tooltipText!: string;
  tooltipAlign!: AlignVariant;
  tooltipVerticalInvert!: boolean;
  tooltipDialog!: boolean;

  inputType!: any;
  customBehavior!: any;

  public testInput: FormControl = new FormControl('');

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
        case 'inputType':
          this.inputType = event;
          break;
        case 'customBehavior':
          this.customBehavior = event;
          break;
        default:
          break;
      }
    }, 800);
  }
}
