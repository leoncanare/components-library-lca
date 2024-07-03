import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PaleteVariant } from '../../types/components.types';
import { SetPalete } from '../../colors/palete.adapter'

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent implements ControlValueAccessor, OnInit {
  /**
   * Change the palete of component.
   */
  @Input() palete: PaleteVariant = 'LCA_PALETE';

  /**
   * Check or uncheck the toggle by default
   */
  @Input() checked = false;

  /**
   * Optional label to the left of the toggle
   */
  @Input() label = '';

  /**
   * Optional label color
   */
  @Input() labelColor: 'black' | 'white' = 'black';

  /**
   * Optional label weight
   */
  @Input() labelWeight: 'normal' | 'bold' = 'normal';

  /**
   * Toggle status
   */
  @Input() disabled = false;

  /**
   * Toggle icon deactivated
   */
  @Input() iconDeactivated!: string;

  /**
   * Toggle icon activated
   */
  @Input() iconActivated!: string;

  /**
   * Output when toggle value is changed
   */
  @Output() toggleChange = new EventEmitter<boolean>();

  controlId = `lca-toggle-${Math.random().toString(36).substring(2)}`;

  onChange = (_: boolean): void => {};

  onTouch = (): void => {};

  ngOnInit(): void {
    SetPalete(this.palete);
  }

  handleChange(checked: boolean): void {
    this.checked = checked;
    this.onTouch();
    this.onChange(this.checked);
    this.toggleChange.emit(checked);
  }

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (_: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }
}
