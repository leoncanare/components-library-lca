import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogComponent } from '../dialog-comp/dialog.component';
import { AlignVariant, PaleteVariant } from '../../types/components.types';
import { SetPalete } from '../../colors/palete.adapter'

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule, DialogComponent],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  /**
   * Change the palete of component.
   */
  @Input() palete: PaleteVariant = 'LCA_PALETE';

  /**
   * Tooltip tittle.
   */
  @Input() titleTooltip!: string;

  /**
   * Tooltip text.
   */
  @Input() textTooltip!: string;

  /**
   * Tooltip align by default it is aligned centered.
   */
  @Input() tooltipAlign: AlignVariant = 'center';

  /**
   * Invert vertical alignment with respect to the tooltip.
   */
  @Input() invertVertical = false;

  /**
   * Enable modal functionality in tablet format (from 768px).
   */
  @Input() enableTooltipDialog = true;

  alive: Subject<boolean> = new Subject<boolean>();

  showTablet!: boolean;
  showTooltip = false;
  showDialogTooltip = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    SetPalete(this.palete);

    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .pipe(takeUntil(this.alive))
      .subscribe((state: BreakpointState) => {
        this.showTablet = state.matches;
      });
  }

  ngOnDestroy(): void {
    this.alive.next(true);
    this.alive.unsubscribe();
  }

  /**
   * Shows the box tooltip when the mouse is over the icon.
   * @param event
   */
  hoverIcon(event: boolean): void {
    this.showTooltip = event;
  }

  /**
   * Shows the dialog version of the tooltip.
   * @param event
   */
  openModalTooltip(event: boolean): void {
    if (this.enableTooltipDialog) {
      this.showDialogTooltip = event;
    }
  }
}
