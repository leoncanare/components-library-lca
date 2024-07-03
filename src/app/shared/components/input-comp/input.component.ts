import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
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
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ButtonComponent } from '../button-comp/button.component';
import { TooltipComponent } from '../tooltip-comp/tooltip.component';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AlignVariant, PaleteVariant, SizeVariant } from '../../types/components.types';
import { IbanPipe } from '../../pipes/iban.pipe';
import { SetPalete } from '../../colors/palete.adapter'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ButtonComponent,
    TooltipComponent,
    CommonModule,
    ClickOutsideDirective,
    FormsModule,
    IbanPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent
  implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit, AfterViewChecked
{ 
  /**
   * Change the palete of component.
   */
  @Input() palete: PaleteVariant = 'LCA_PALETE';

  /**
   * Name of the HTML input
   *
   * @required
   */
  @Input() name!: string;

  /**
   * Optional input label
   */
  @Input() label!: string;

  /**
   * Optional input defaultValue
   */
  @Input() defaultValue!: string;

  /**
   * Input status
   */
  @Input() disabled = false;

  /**
   * Optional input label
   */
  @Input() placeholder = '';

  /**
   * Optional helper text
   */
  @Input() helper!: string;

  /**
   * Optional tooltip seter, if true, would always be shown, but only if it had no value.
   */
  @Input() tooltipPermanent = false;

  /**
   * Optional tooltip title
   */
  @Input() tooltipTitle!: string;

  /**
   * Optional tooltip text
   */
  @Input() tooltipText!: string;

  /**
   * Optional tooltip align
   */
  @Input() tooltipAlign!: AlignVariant;

  /**
   * Optional tooltip vertical
   */
  @Input() tooltipVertical!: boolean;

  /**
   * Optional tooltip modal view
   */
  @Input() tooltipDialog = true;

  /**
   * Optional input length limit (65 by default for safety issues)
   */
  @Input() maxLength = 65;

  /**
   *  Optional property to show input in two lines if value is too long
   */
  @Input() multiline = false;

  /**
   *  Optional visual non-editable prefix
   */
  @Input() prefix!: string;

  /**
   *  Optional visual non-editable suffix
   */
  @Input() suffix!: string;

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
   * Optional input width (300px by default). You can set any valid CSS value
   */
  @Input() @HostBinding('style.width') width = '300px';

  /**
   * Input size
   */
  @Input() size: SizeVariant = 'standard';

  /**
   *  Optional custom behaviours
   */
  @Input() variant: 'standard' | 'clear' = 'standard';

  /**
   * Input type
   */
  @Input() type: 'text' | 'number' | 'password' = 'text';

  /**
   *  Optional custom behaviours
   */
  @Input() customBehaviour!: 'IBAN' | 'password';

  /**
   * Output when input value is changed
   */
  @Output() inputChage = new EventEmitter<unknown>();

  @ViewChild('textarea') textarea!: ElementRef;
  @ViewChild('fieldContainer') fieldContainer!: ElementRef;

  private innerValue = '';

  destroy = new Subject<boolean>();
  control!: FormControl;
  showPassword = false;
  showIBAN = false;
  fieldOnFocus = false;
  touched = true;

  /** Variables for validation of the password type field when validation is active */
  checkLength = false;
  oneDigit = new RegExp(/^((?=.*\d))/);
  checkOneDigit = false;
  oneMin = new RegExp(/^((?=.*[a-z]))/);
  checkOneMin = false;
  oneCap = new RegExp(/^((?=.*[A-Z]))/);
  checkOneCap = false;
  passwordValid = true;

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

  /** We set the controls and inject the control for IBAN validation. */
  ngOnInit(): void {
    SetPalete(this.palete);
    this.setControl();

    if (this.control && this.customBehaviour === 'IBAN') {
      this.control.setValidators(this.IBANValidator());
      this.errorMessages = {
        iban: 'El IBAN introducido no es válido: ES00 0000 0000 00 0000000000',
        ...this.errorMessages,
      };
    }
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

  /** We modify the styles of the multiline function in terms of the value entered. */
  ngAfterViewChecked(): void {
    if (this.textarea) {
      if (!this.value) {
        this.fieldContainer.nativeElement.style.height = null;
        this.textarea.nativeElement.style.height = null;
      } else {
        this.fieldContainer.nativeElement.style.height = 'auto';
        this.textarea.nativeElement.style.height = 'auto';
        this.fieldContainer.nativeElement.style.height = `${this.textarea.nativeElement.scrollHeight}px`;
        this.textarea.nativeElement.style.height = `${this.textarea.nativeElement.scrollHeight}px`;
      }
    } else {
      this.fieldContainer.nativeElement.style.height = null;
    }
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  /** ControlValueAccessor METHODS - START */

  handleInput(value: string): void {
    this.innerValue = value;
    this.onTouched();
    this.onChange(this.value);
    this.inputChage.emit(this.value);
  }

  handleFocus(): void {
    this.fieldOnFocus = true;
    this.showIBAN = true;
    if (this.customBehaviour === 'password') this.control.setErrors(null);
  }

  handleBlur(event: FocusEvent): void {
    if (!event.relatedTarget) {
      this.fieldOnFocus = false;
      this.control?.setValue(this.value);
      this.onTouched();
    }
    if (this.showIBAN) {
      this.showIBAN = false;
    }
    if (this.customBehaviour === 'password' && !this.passwordValid && this.value !== '') {
      this.control.setErrors({ noValid: 'noValid' });
    }
  }

  writeValue(value: string): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.fieldOnFocus = false;
    }
    if (value === null) {
      this.innerValue = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /** ControlValueAccessor METHODS - END */

  /** We set the controls depending on the type of integration of our component */
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

  clickOutside(): void {
    this.fieldOnFocus = false;
  }

  /** Input Buttons METHODS */

  handleShow(): void {
    this.showPassword = !this.showPassword;
    this.showIBAN = this.customBehaviour === 'IBAN' ? !this.showIBAN : false;
  }

  handleClear(): void {
    this.fieldOnFocus = false;
    this.control?.setValue(this.value);

    this.handleInput('');

    if (this.customBehaviour === 'password') {
      this.checkLength = false;
      this.checkOneCap = false;
      this.checkOneDigit = false;
      this.checkOneMin = false;
    }
  }

  handleKeyUp(value: string): void {
    if (this.customBehaviour === 'password') this.passwordValidation(value);
  }

  /** Password Validation in customBehaviour type: passsword*/
  passwordValidation(value: string): void {
    this.checkLength = value.length < 8 ? false : true;
    this.checkOneDigit = this.oneDigit.test(value);
    this.checkOneCap = this.oneCap.test(value);
    this.checkOneMin = this.oneMin.test(value);

    const passwordChecker: boolean[] = [
      this.checkLength,
      this.checkOneCap,
      this.checkOneDigit,
      this.checkOneMin,
    ];

    this.passwordValid = passwordChecker.every((element) => element);
  }

  /** IBAN METHODS - STRAT */

  IBANValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = this.checkIBAN(control.value);
      return forbidden ? { iban: { value: control.value } } : null;
    };
  }

  checkIBAN(IBAN: string): boolean {
    const IBANregex = /([ES]{2})\s*(\d{2})\s*(\d{4})\s*(\d{4})\s*(\d{2})\s*(\d{10})/g;
    if (!IBANregex.test(IBAN) || IBAN.replace(/ /g, '').length !== 24) {
      return true;
    }

    const parsedIBAN = IBAN.toUpperCase().replace(/ /g, '');

    const firstLetter = parsedIBAN.substring(0, 1);
    const secondLetter = parsedIBAN.substring(1, 2);
    const firstNumberCode = this.getnumIBAN(firstLetter);
    const secondNumberCode = this.getnumIBAN(secondLetter);

    let auxIBAN = `${String(firstNumberCode)}${String(
      secondNumberCode
    )}${parsedIBAN.substring(2)}`;
    auxIBAN = `${auxIBAN.substring(6)}${auxIBAN.substring(0, 6)}`;

    return this.mod97(auxIBAN) !== 1;
  }

  mod97(iban: string): number {
    const parts = Math.ceil(iban.length / 7);
    let remainer = 0;
    for (let i = 1; i <= parts; i++) {
      remainer = parseFloat(remainer + iban.substring((i - 1) * 7, (i - 1) * 7 + 7)) % 97;
    }
    return remainer;
  }

  getnumIBAN(letter: string): number {
    const ls_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return ls_letters.search(letter) + 10;
  }

  /** IBAN METHODS - END */
}
