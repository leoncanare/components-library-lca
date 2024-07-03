import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { Subject, takeUntil, tap } from 'rxjs';
import { PaleteVariant } from '../../types/components.types';
import { SetPalete } from '../../colors/palete.adapter'

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideDirective,
  ],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  /**
   * Change the palete of component.
   */
  @Input() palete: PaleteVariant = 'LCA_PALETE';

  /**
   * Name of the HTML textarea
   *
   * @required
   */
  @Input() name!: string;

  /**
   * Optional textarea label
   */
  @Input() label!: string;

  /**
   * Optional textarea defaultValue
   */
  @Input() defaultValue!: string;

  /**
   * Optional textarea placeholder
   */
  @Input() placeholder = '';

  /**
   * Input status
   */
  @Input() disabled = false;

  /**
   * Optional helper text
   */
  @Input() helper!: string;

  /**
   * Optional textarea length limit (999 by default for safety issues)
   */
  @Input() maxLength = 999;

  /**
   * Optional counter behind the textarea
   */
  @Input() counter = false;

  /**
   * Optional custom width. You can set any valid CSS value [Example: 500px]
   */
  @Input() width = '300px';

  /**
   * Optional custom height. You can set any valid CSS value [Example: 500px]
   */
  @Input() height = '150px';

  /**
   *  Optional custom error messages for validators. Allowed key values are the same used in class Validators from @angular/forms or your own custom validators.
   *
   *  Example:
   *
   *  const control = new FormControl(1, [Validators.max(5), Validators.min(1)]);
   *  const errorMessages = { max: 'Max value is 5', min: 'Minimum value is 1' };
   */
  @Input() errorMessages!: { [key: string]: string };

  /**
   * Output when textarea value is changed
   */
  @Output() textareaChange = new EventEmitter<unknown>();

  private innerValue = '';

  control!: FormControl;
  fieldOnFocus = false;

  destroy = new Subject<boolean>();

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(@Inject(Injector) private injector: Injector) {}

  get value(): string {
    return this.innerValue;
  }

  set value(value: string) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.onTouched();
    }
  }

  ngOnInit(): void {
    SetPalete(this.palete);

    this.setControl();
  }

  /** Set the default value if it exists */
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.defaultValue) {
        this.writeValue(this.defaultValue);
        this.onChange(this.defaultValue);
      }
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  /** ControlValueAccessor METHODS - START */

  handleTextarea(value: string): void {
    this.innerValue = value;
    this.onTouched();
    this.onChange(this.value);
    this.textareaChange.emit(this.value);
  }

  handleFocus(): void {
    this.fieldOnFocus = true;
  }

  handleBlur(event: FocusEvent): void {
    if (!event.relatedTarget) {
      this.fieldOnFocus = false;
      this.control?.setValue(this.value);
      this.onTouched();
    }
  }

  writeValue(value: string): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.fieldOnFocus = false;
    }
  }

  clickOutside(): void {
    const textarea: HTMLElement | null = document.getElementById('textarea');
    if (textarea && textarea?.scrollTop != 0) {
      textarea.scrollTop = 0;
    }
    this.fieldOnFocus = false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /** ControlValueAccessor METHODS - END */

  /**
   * We set the controls for the component and be able to use them.
   */
  setControl(): void {
    const injectedControl = this.injector.get(NgControl);
    switch (injectedControl.constructor) {
      case NgModel: {
        const { control, update } = injectedControl as NgModel;
        this.control = control;
        this.control.valueChanges
          .pipe(
            tap((value) => {
              update.emit(value);
            }),
            takeUntil(this.destroy)
          )
          .subscribe();
        break;
      }
      case FormControlName: {
        this.control = this.injector
          .get(FormGroupDirective)
          .getControl(injectedControl as FormControlName);
        break;
      }
      default: {
        this.control = (injectedControl as FormControlDirective).form as FormControl;
        break;
      }
    }
  }
}
