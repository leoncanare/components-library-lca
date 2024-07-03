import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import {
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
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ButtonComponent } from '../button-comp/button.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AbbreviatedMonths, DaysWeek, Months } from '../../mocks/date-picker-data.mock';
import { PaleteVariant, SizeVariant } from '../../types/components.types';
import { SetPalete } from '../../colors/palete.adapter'
import { GREEN_PALETE, LCA_PALETE, PURPLE_PALETE } from '../../colors/paletes';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
    ClickOutsideDirective,
  ],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
    DatePipe,
  ],
})
export class DatepickerComponent implements OnInit, OnDestroy {
  /**
   * Change the palete of component.
   */
  @Input() palete: PaleteVariant = 'LCA_PALETE';

  /**
   * Variable for set size
   * */
  @Input() size: SizeVariant = 'standard';

  /**
   * Variable for label
   */
  @Input() label!: string;

  /**
   * Name of the HTML select
   *
   * @required
   */
  @Input() name!: string;

  /**
   * Select status
   */
  @Input() disabled = false;

  /**
   * Variable for options helper
   * */
  @Input() helper!: string;

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
   * Optional slect width (300px by default). You can set any valid CSS value
   */
  @Input() @HostBinding('style.width') width = '250px';

  /**
   * Control variable for set and emit today when not in use ngModel or FormControl
  */
  @Input() today = false;

  /**
   * Event emitted when the day is selected
   * */
  @Output() date = new EventEmitter<Date | null>();


  private innerValue: Date | null = null;
  control!: FormControl;
  destroy = new Subject<boolean>();
  colorSelect!: string;

  fieldOnFocus = false;
  isInputHovered = false;

  unfold = false;
  isDayActive = false;
  isYearsActive = false;
  isMonthActive = false;

  selectedDate: Date = new Date();
  dateToStyle: Date = new Date();

  dateValue!: string | null;
  previousSelectedDateFormated!: string;
  currentYear!: number;
  currentMonth!: number;

  daysInMonth: any[] = [];
  months: string[] = Months;
  abbreviatedMonths: string[] = AbbreviatedMonths;
  daysWeek: string[] = DaysWeek;

  years: number[] = [];
  startingDay!: number;

  constructor(
    @Inject(Injector) private injector: Injector,
    private _datePipeService: DatePipe,
    private _el: ElementRef
  ) {
    this.calculateDaysInMonth();
  }

  ngOnInit(): void {
    SetPalete(this.palete);

    this.setToday();
    this.getYears(this.currentYear);
    this.setControl();
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  get value(): Date | null {
    return this.innerValue;
  }

  set value(value: Date) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.onTouched();
    }
  }


  /** ControlValueAccessor METHODS - START */
  handleDate(value: Date | null): void {
    this.innerValue = value;
    this.onTouched();
    this.onChange(this.value);
    this.date.emit(this.value);
  }

  handleFocus(): void {
    this.fieldOnFocus = true;
  }

  handleBlur(event: FocusEvent): void {
    if (!event.relatedTarget) {
      this.fieldOnFocus = false;
    }
    this.onTouched();
  }

  writeValue(value: Date): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.dateValue = this._datePipeService.transform(
        value,
        'dd/MM/yyyy'
      );
    }
    if (value === null) {
      this.innerValue = null;
      this.clearDate();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  /**
   * Handler to set and emit today when not in use ngModel or FormControl
   * */
  setToday() {
    switch (this.palete) {
      case 'LCA_PALETE':
        this.colorSelect = LCA_PALETE.component_shadow_contrast;
        break;
      case 'GREEN_PALETE':
        this.colorSelect = GREEN_PALETE.component_shadow_contrast;
        break;
      case 'PURPLE_PALETE':
        this.colorSelect = PURPLE_PALETE.component_shadow_contrast;
        break;
    }
    
    if (this.today) {
      this.dateValue = this._datePipeService.transform(
        this.selectedDate,
        'dd/MM/yyyy'
      );
      this.handleDate(this.selectedDate);
    }
  }

  /**
   * Handler to open/close the calendar
   */
  showDatePicker(): void {
    if (this.unfold) {
      if (!this.dateValue) {
        this.resetDatePicker();
        this.onTouched();
      } else {
        this.unfold = false;
        this.isDayActive = false;
        this.isYearsActive = false;
        this.isMonthActive = false;
        this.writeDate();
      }
    } else {
      this.unfold = true;
      this.isDayActive = true;
      this.writeDate();
    }
  }

  /**
   * Reset the calendar
   */
  resetDatePicker(): void {
    this.unfold = false;
    this.isDayActive = false;
    this.isYearsActive = false;
    this.isMonthActive = false;
    this.selectedDate = new Date();
    this.dateToStyle = new Date();
    this.calculateDaysInMonth();
    this.getYears(this.currentYear);
  }

  /**
   * Clear the input, reset the calendar and emit null
   */
  clearDate(): void {    
    this.dateValue = null;
    this.handleDate(null);
    this.resetDatePicker();
  }

  /**
   * Get years before and after date
   */
  getYears(currentYear: number): void {
    const previousYears = Array.from(
      { length: 8 },
      (_, index) => currentYear - 8 + index
    );
    const laterYears = Array.from(
      { length: 8 },
      (_, index) => currentYear + index
    );

    this.years = previousYears.concat(laterYears);
  }

  /**
   * Calculate the days of the month
   */
  calculateDaysInMonth(): void {
    this.currentYear = this.selectedDate.getFullYear();
    this.currentMonth = this.selectedDate.getMonth();

    // Get the first day of the month and get the day of the week.
    const firstDayOfMonth = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();
    // Adjust so that Monday is the first day of the week.
    this.startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    // Get the last day of the month to get the total number of days in the month.
    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
    // Creates an array with the number of days in the month plus the first day adjustment. If the index i is less than startingDay, the value is null. Otherwise, the corresponding day of the month is assigned.
    this.daysInMonth = Array.from(
      { length: daysInMonth + this.startingDay },
      (_, i) => (i < this.startingDay ? null : i - this.startingDay + 1)
    );
  }

  /**
   * Emmits selected date
   */
  selectDate(day: number): void {
    if (day) {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
      this.dateToStyle = new Date(this.currentYear, this.currentMonth, day);
      this.dateValue = this._datePipeService.transform(
        this.selectedDate,
        'dd/MM/yyyy'
      );
      this.unfold = false;
      this.getYears(this.currentYear);
      this.handleDate(this.selectedDate);
    }
  }

  /**
   * Manual date entry
   */
  writeDate(): void {
    if (this.dateValue) {
      this.dateValue = this.dateValue.replace(/\D/g, '');
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      switch (this.dateValue.length) {
        case 1:
        case 2:
          if (
            +this.dateValue >= 1 &&
            +this.dateValue <=
              new Date(currentYear, currentMonth, 0).getDate()
          ) {
            this.selectedDate = this.dateToStyle = new Date(
              currentYear,
              currentMonth - 1,
              +this.dateValue
            );
            this.dateValue = this._datePipeService.transform(
              this.selectedDate,
              'dd/MM/yyyy'
            );
            this.handleDate(this.selectedDate);
          } else {
            this.clearDate();
          }
          break;
        case 3:
        case 4: {
          const day = +this.dateValue.slice(0, 2);
          const month = +this.dateValue.slice(2);
          const lastDayOfMonth = new Date(currentYear, month, 0).getDate();

          if (day >= 1 && day <= lastDayOfMonth && month >= 1 && month <= 12) {
            this.selectedDate = this.dateToStyle = new Date(
              currentYear,
              month - 1,
              day
            );
            this.dateValue = this._datePipeService.transform(
              this.selectedDate,
              'dd/MM/yyyy'
            );
            this.calculateDaysInMonth();
            this.handleDate(this.selectedDate);
          } else {
            this.clearDate();
          }
          break;
        }
        case 6: {
          const dayFromDigits56 = +this.dateValue.slice(0, 2);
          const monthFromDigits56 = +this.dateValue.slice(2, 4);
          const yearDigits56 = +this.dateValue.slice(4);
          const adjustedYear =
            yearDigits56 >= 0 && yearDigits56 <= 68
              ? 2000 + yearDigits56
              : 1900 + yearDigits56;

          if (
            dayFromDigits56 >= 1 &&
            dayFromDigits56 <= 31 &&
            monthFromDigits56 >= 1 &&
            monthFromDigits56 <= 12
          ) {
            const lastDayOfMonth = new Date(
              adjustedYear,
              monthFromDigits56,
              0
            ).getDate();

            if (dayFromDigits56 <= lastDayOfMonth) {
              this.selectedDate = new Date(
                adjustedYear,
                monthFromDigits56 - 1,
                dayFromDigits56
              );
              this.dateToStyle = new Date(
                adjustedYear,
                monthFromDigits56 - 1,
                dayFromDigits56
              );
              this.dateValue = this._datePipeService.transform(
                this.selectedDate,
                'dd/MM/yyyy'
              );
              this.calculateDaysInMonth();
              this.getYears(this.currentYear);
              this.handleDate(this.selectedDate);
            } else this.clearDate();
          } else this.clearDate();
          break;
        }
        case 8: {
          const dayFromDigits78 = +this.dateValue.slice(0, 2);
          const monthFromDigits78 = +this.dateValue.slice(2, 4);
          const yearDigits78 = +this.dateValue.slice(4);

          if (yearDigits78 >= 0) {
            if (
              dayFromDigits78 >= 1 &&
              dayFromDigits78 <= 31 &&
              monthFromDigits78 >= 1 &&
              monthFromDigits78 <= 12
            ) {
              const lastDayOfMonth = new Date(
                yearDigits78,
                monthFromDigits78,
                0
              ).getDate();

              if (dayFromDigits78 <= lastDayOfMonth) {
                this.selectedDate = new Date(
                  yearDigits78,
                  monthFromDigits78 - 1,
                  dayFromDigits78
                );
                this.dateToStyle = new Date(
                  yearDigits78,
                  monthFromDigits78 - 1,
                  dayFromDigits78
                );
                this.dateValue = this._datePipeService.transform(
                  this.selectedDate,
                  'dd/MM/yyyy'
                );
                this.calculateDaysInMonth();
                this.getYears(this.currentYear);
                this.handleDate(this.selectedDate);
              }
            } else this.clearDate();
          } else this.clearDate();
          break;
        }
        default:
          this.clearDate();
          break;
      }
    }
  }

  /**
   * Change de current month in days view
   */
  changeMonth(offset: number): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + offset);
    this.calculateDaysInMonth();
  }

  /**
   * Change current year
   */
  setYear(year: number): void {
    this.selectedDate.setFullYear(year);
    this.calculateDaysInMonth();
  }

  /**
   * Change the range of years
   */
  changeYears(offset: number): void {
    offset === 1
      ? (this.years = Array.from(
          { length: 16 },
          (_, index) => this.years[this.years.length - 1] + index + 1
        ))
      : (this.years = Array.from(
          { length: 16 },
          (_, index) => this.years[0] - 16 + index
        ));
  }

  /**
   * Change current year in month view
   */
  changeYear(offset: number): void {
    offset === 1
      ? this.selectedDate.setFullYear(this.selectedDate.getFullYear() + 1)
      : this.selectedDate.setFullYear(this.selectedDate.getFullYear() - 1);
    this.calculateDaysInMonth();
  }

  /**
   * Change the current month
   */
  setMonth(month: number): void {
    this.selectedDate.setMonth(month);
    this.calculateDaysInMonth();
  }

  /**
   * Closes the calendar when clicked out
   */
  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    const clickedInsideComponent = this._el.nativeElement.contains(
      event.target
    );

    if (!clickedInsideComponent) {
      if (this.unfold) {
        this.showDatePicker();
      } else if (
        !this.unfold &&
        this.dateValue &&
        this.dateValue !== this.previousSelectedDateFormated
      ) {
        this.writeDate();
        this.previousSelectedDateFormated = this.dateValue;
      } else if (!this.unfold && this.dateValue === '') {
        this.clearDate();
      }
    }
  }

  /**
   * Prevent the calendar from closing by clicking on the drop-down menu
   */
  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  /**
   * Get styles of the selected day
   * @returns styles object
   */
  getStyleDay(day: number): { [key: string]: string } {
    return day === this.selectedDate.getDate() &&
      this.dateToStyle.getMonth() === this.selectedDate.getMonth() &&
      this.dateToStyle.getFullYear() === this.selectedDate.getFullYear()
      ? {
          color: 'white',
          'background-color': this.colorSelect,
          'border-radius': '5px',
        }
      : {};
  }

  /**
   * Get styles of the selected year
   * @returns styles object
   */
  getStyleYear(year: number): { [key: string]: string } {
    return year === this.selectedDate.getFullYear()
      ? {
          color: 'white',
          'background-color': this.colorSelect,
          'border-radius': '5px',
        }
      : {};
  }

  /**
   * Get styles of the selected month
   * @returns styles object
   */
  getStyleMonth(month: number): { [key: string]: string } {
    return month === this.selectedDate.getMonth()
      ? {
          color: 'white',
          'background-color': this.colorSelect,
          'border-radius': '5px',
        }
      : {};
  }

  /**
   * Controls that the user can only type in numbers
   */
  onKeyPress(event: KeyboardEvent): void {
    // Allow numbers (ASCII codes between 48 and 57) and the slash "/"
    if ((event.charCode < 48 || event.charCode > 57) && event.charCode !== 47) {
      event.preventDefault();
    }
  }

  /**
   * Controls the hover of the input and icon calendar
   */
  onInputHover(isHovered: boolean) {
    this.isInputHovered = isHovered;
  }

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
        this.control = (injectedControl as FormControlDirective)
          .form as FormControl;
        break;
      }
    }
  }
}
