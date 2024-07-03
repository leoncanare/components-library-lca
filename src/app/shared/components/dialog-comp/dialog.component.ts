import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ButtonComponent } from '../button-comp/button.component';
import { PaleteVariant, SizeVariant } from '../../types/components.types';
import { SetPalete } from '../../colors/palete.adapter'

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit,OnChanges {
  /**
   * Change the palete of component.
   */
  @Input() palete: PaleteVariant = 'LCA_PALETE';

  /**
   *
   * Control variable for dialog visibility
   */
  @Input() showDialog!: boolean;

  /**
   *
   * Dialog size
   */
  @Input() size: SizeVariant = 'small';

  /**
   *
   * Time for dialog close
   */
  @Input() timeDialogOpen!: number;

  /**
   *
   * Block dialog
   */
  @Input() bgBlocked = false;

  /**
   *
   * Dialog title
   */
  @Input() titleDialog!: string;

  /**
   *
   * Dialog image url
   */
  @Input() imageDialog = '';

  /**
   *
   * Dialog text
   */
  @Input() textDialog!: string;

  /**
   *
   * Show primary button
   */
  @Input() primaryButton = false;

  /**
   *
   * Show secondary button
   */
  @Input() secondaryButton = false;

  /**
   *
   * Primary button label
   */
  @Input() labelPrimaryButton = 'Acept';

  /**
   *
   * Secondary button label
   */
  @Input() labelSecondaryButton = 'Cancel';

  /**
   *
   * Activate ng-content
   */
  @Input() ngContentActive = false;

  /**
   *
   * Activate ng-content
   */
  @Input() tooltipDialog = false;

  /**
   * Event emitted when secondary button is clicked
   */
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();

  /**
   * Event emitted when primary button is clicked
   */
  @Output() confirm: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    SetPalete(this.palete);
  }

  ngOnChanges(): void {
    this.settimeDialogOpen();
    this.blockBodyScroll();
  }

  /**
   * Close dialog with escape key
   */
  @HostListener('document:keydown', ['$event'])
  onKeyDown($event: KeyboardEvent): void {
    if (!this.bgBlocked && this.showDialog) {
      if ($event.key === 'Escape') {
        this.close();
      }
    }
  }

  /**
   * Activate close dialog by clicking on the back of the dialog.
   */
  onExit($event: MouseEvent): void {
    if (!this.bgBlocked) {      
      const targetElement = $event.target as HTMLElement;
      if (targetElement.id === 'modal-content') {
        this.close();
      }
    }
  }

  /**
   * Close dialog. Handle event closeDialog
   */
  close(): void {
    this.closeDialog.emit(false);
    this.blockBodyScroll();
  }

  /**
   * Handle event primary button click
   */
  handlePrimaryButtonClick(): void {
    this.confirm.emit(true);
    this.showDialog = false;
  }

  /**
   * Set time dialog close
   */
  settimeDialogOpen(): void {
    if (this.showDialog && this.timeDialogOpen) {
      setTimeout(() => {
        this.close();
      }, this.timeDialogOpen);
    }
  }

  /**
   * Block body scroll
   */
  blockBodyScroll(): void {
    this.showDialog
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }
}
