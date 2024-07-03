/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { PaleteVariant } from '../../types/components.types';
import { SetPalete } from '../../colors/palete.adapter'

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent
  implements OnInit,ControlValueAccessor, AfterViewInit
{
  /**
   * Change the palete of component.
   */
  @Input() palete: PaleteVariant = 'LCA_PALETE';

  /**
   * Name of checkbox
   *
   * @required
   */
  @Input() name!: string;

  /**
   * Label of checkbox
   *
   * @required
   */
  @Input() label!: string;

  /**
   * State of checkbox
   *
   */
  @Input() checked!: boolean;

  /**
   * Checkbox status
   */
  @Input() disabled = false;

  /**
   * Checkbox secondary stile
   */
  @Input() secondary!: boolean;

  /**
   * Output when checkbox value is changed
   */
  @Output() checkboxChange = new EventEmitter<unknown>();

  private innerValue = false;

  ngOnInit(): void {
    SetPalete(this.palete);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.checked === true) {
        this.writeValue(true);
        this.onChange(true);
      }
    }, 0);
  }

  get value(): boolean {
    return this.innerValue;
  }

  set value(value: boolean) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.onChange(value);
      this.onTouched();
    }
  }

  toggleCheckbox(event: any) {
    const ischecked = (event.target as HTMLInputElement).checked;
    this.value = ischecked;
    this.onChange(this.value);
    this.checkboxChange.emit(this.value);
  }

  writeValue(value: boolean): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
