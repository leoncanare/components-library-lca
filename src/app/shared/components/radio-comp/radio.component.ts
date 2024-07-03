/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioOption } from '../../models/components.models';
import { PaleteVariant } from '../../types/components.types';
import { SetPalete } from '../../colors/palete.adapter'

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements OnInit,ControlValueAccessor {
  /**
   * Change the palete of component.
   */
  @Input() palete: PaleteVariant = 'LCA_PALETE';

  /**
   * Radio group options
   *
   * @required
   */
  @Input() options!: RadioOption[];

  /**
   * Name of the container radio group
   *
   * @required
   */
  @Input() name!: string;

  /**
   * Radio group status
   */
  @Input() disabled = false;

  /**
   * Output when radio value is changed
   */
  @Output() radioChange = new EventEmitter<unknown>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: unknown): void => {};

  onTouch = (): void => {};

  ngOnInit(): void {
    SetPalete(this.palete);
  }

  handleChange(selectedValue: unknown): void {
    this.options?.forEach((option) =>
      option.value === selectedValue ? (option.checked = true) : (option.checked = false)
    );
    this.onTouch();
    this.onChange(selectedValue);
    this.radioChange.emit(selectedValue);
  }

  writeValue(value: unknown): void {
    this.options?.forEach((option) => (option.value === value ? (option.checked = true) : (option.checked = false)));
  }

  registerOnChange(fn: (_: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  optionByValue(_index: number, option: RadioOption): unknown {
    return option.value;
  }
}
