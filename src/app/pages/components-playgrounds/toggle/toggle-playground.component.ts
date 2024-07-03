import { Component, OnInit } from '@angular/core';
import { PlaygroundPannelComponent } from '../../../shared/playground-pannel/playground-pannel.component';
import { NgClass } from '@angular/common';
import { ToggleComponent } from '../../../shared/components/toggle-comp/toggle.component';
import { PaleteVariant } from '../../../shared/types/components.types';
import { SpinnerComponent } from '../../../shared/components/spinner-comp/spinner.component';

@Component({
  selector: 'app-select-playground',
  standalone: true,
  imports: [
    ToggleComponent,
    PlaygroundPannelComponent,
    NgClass,
    SpinnerComponent
  ],
  templateUrl: './toggle-playground.component.html',
  styleUrls: ['../../../shared/scss/components/_playgrounds.component.scss'],
})
export class TogglePlaygroundComponent implements OnInit {
  loader = false;

  /** PROPIETIES */
  palete: PaleteVariant = 'LCA_PALETE';
  label: string = 'Toggle';
  disabled: boolean = false;
  iconActive!: string;
  iconDeactive!: string;

  constructor() {}

  ngOnInit() {}

  handleControlIcons(event: any, control: string): void {
    switch (control) {
      case 'all':
        if(event){
          this.iconActive = '../../../../assets/icons/thumb-up-line.svg';
          this.iconDeactive = '../../../../assets/icons/thumb-down-line.svg';
        }else {
          this.iconActive = '';
          this.iconDeactive = '';
        }
        break;
      case 'active':
        this.iconActive = event;
        break;
      case 'deactive':
        this.iconDeactive = event;        
        break;
    }
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
