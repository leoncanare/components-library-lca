import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { PlaygroundPannelComponent } from '../../../shared/playground-pannel/playground-pannel.component';
import { SpinnerComponent } from '../../../shared/components/spinner-comp/spinner.component';
import { TextareaComponent } from '../../../shared/components/textarea-comp/textarea.component';
import { PaleteVariant } from '../../../shared/types/components.types';

@Component({
  selector: 'app-select-playground',
  standalone: true,
  imports: [
    TextareaComponent,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    PlaygroundPannelComponent,
    SpinnerComponent
  ],
  templateUrl: './textarea-playground.component.html',
  styleUrls: ['../../../shared/scss/components/_playgrounds.component.scss'],
})
export class TextareaPlaygroundComponent implements OnInit {
  loader = false;

  /** PROPIETIES */
  palete: PaleteVariant = 'LCA_PALETE';
  label!: string;
  disabled: boolean = false;
  width: string = '300px';
  height: string  = '150px';
  placeholder: string = '';
  helper!: string;
  defaultValue!: string;
  maxLength: number = 999;
  counter: boolean = false;

  public testTextarea: FormControl = new FormControl('');

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
