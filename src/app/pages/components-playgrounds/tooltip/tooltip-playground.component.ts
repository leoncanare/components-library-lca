import { Component, OnInit } from '@angular/core';
import { PlaygroundPannelComponent } from '../../../shared/playground-pannel/playground-pannel.component';
import { NgClass } from '@angular/common';
import { TooltipComponent } from '../../../shared/components/tooltip-comp/tooltip.component';
import { AlignVariant, PaleteVariant } from '../../../shared/types/components.types';
import { SpinnerComponent } from '../../../shared/components/spinner-comp/spinner.component';

@Component({
  selector: 'app-select-playground',
  standalone: true,
  imports: [
    TooltipComponent,
    PlaygroundPannelComponent,
    NgClass,
    SpinnerComponent
  ],
  templateUrl: './tooltip-playground.component.html',
  styleUrls: ['../../../shared/scss/components/_playgrounds.component.scss'],
})
export class TooltipPlaygroundComponent implements OnInit {
  loader = false;

  /** PROPIETIES */
  palete: PaleteVariant = 'LCA_PALETE';
  tooltipTitle!: string;
  tooltipText!: string;
  tooltipAlign!: AlignVariant;
  tooltipVerticalInvert!: boolean;

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
