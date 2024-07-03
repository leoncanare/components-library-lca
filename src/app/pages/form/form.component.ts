import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button-comp/button.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpinnerComponent } from '../../shared/components/spinner-comp/spinner.component';
import { InputComponent } from '../../shared/components/input-comp/input.component';
import { isbnValidator } from './validators/isbn.validator';
import { CountryService } from './services/api-rest.service';
import {
  RadioOption,
  SelectOption,
} from '../../shared/models/components.models';
import { SelectComponent } from '../../shared/components/select-comp/select.component';
import { ToggleComponent } from '../../shared/components/toggle-comp/toggle.component';
import { TextareaComponent } from '../../shared/components/textarea-comp/textarea.component';
import { DatepickerComponent } from '../../shared/components/date-picker-comp/datepicker.component';
import { RadioComponent } from '../../shared/components/radio-comp/radio.component';
import { CheckboxComponent } from '../../shared/components/checkbox-comp/checkbox.component';
import { DialogComponent } from '../../shared/components/dialog-comp/dialog.component';
import { CommonModule } from '@angular/common';
import { Book } from './models/book.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    SelectComponent,
    ToggleComponent,
    TextareaComponent,
    DatepickerComponent,
    RadioComponent,
    CheckboxComponent,
    DialogComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SpinnerComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  loadingRegister: boolean = false;
  languagesOptions!: SelectOption[];
  countriesOptions!: SelectOption[];
  categoriesList: string[] = [];

  bookDialog: boolean = false;
  bookData!: Book;

  requiredMenssage = { required: 'Field is required' };
  pagesMenssage = {
    required: 'Field is required',
    min: 'The number of pages must be more than 50.',
  };

  coverType: RadioOption[] = [
    { label: 'Hard', value: 'hard' },
    { label: 'Soft', value: 'soft' },
  ];

  bookCategories: RadioOption[] = [
    { label: 'Fiction', value: 'fiction', checked: false },
    { label: 'Non-Fiction', value: 'non-fiction', checked: false },
    { label: 'Science Fiction', value: 'science fiction', checked: false },
    { label: 'Fantasy', value: 'fantasy', checked: false },
  ];

  bookCategories2: RadioOption[] = [
    { label: 'Mystery', value: 'mystery', checked: false },
    { label: 'Biography', value: 'biography', checked: false },
    { label: 'History', value: 'history', checked: false },
    { label: 'Self-Help', value: 'self help', checked: false },
  ];

  registerForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [isbnValidator, Validators.required]),
    edition: new FormControl(''),
    realease: new FormControl(''),
    procedence: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    pages: new FormControl('', [Validators.min(50), Validators.required]),
    cover: new FormControl('', [Validators.required]),
    digitalFormat: new FormControl(''),
    summary: new FormControl(''),
  });

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService
      .getLanguages()
      .subscribe((languages: SelectOption[]) => {
        this.languagesOptions = languages;
      });

    this.countryService
      .getCountries()
      .subscribe((countries: SelectOption[]) => {
        this.countriesOptions = countries;
      });
  }

  hadleCategory(event: boolean, value: string): void {
    event
      ? this.categoriesList.push(value)
      : (this.categoriesList = this.categoriesList.filter(
          (item) => item !== value
        ));
  }

  handleSubmitForm(): void {
    const formValue = this.registerForm.value;
    const dataSubmit: Book = {
      title: formValue.title,
      author: formValue.author,
      publisher: formValue.publisher,
      isbn: formValue.isbn,
      edition: formValue.edition,
      procedence: formValue.procedence.label,
      language: formValue.language.label,
      pages: formValue.pages,
      coverType: formValue.cover,
    };
    formValue.digitalFormat
      ? (dataSubmit.digitalFormat = 'Yes')
      : (dataSubmit.digitalFormat = 'No');
    if (formValue.realease) {
      dataSubmit.realease = formValue.realease.toDateString();
    }
    if (this.categoriesList) dataSubmit.categories = this.categoriesList;
    if (formValue.summary) dataSubmit.summary = formValue.summary;

    this.bookData = dataSubmit;
    this.bookDialog = true;
  }

  resetForm(): void {
    this.loadingRegister = true;

    setTimeout(() => {
      this.registerForm.reset();
      this.resetCategories();
      this.loadingRegister = false;
    }, 800);
  }

  resetCategories(): void {
    this.bookCategories.forEach((category) => {
      category.checked = false;
    });

    this.bookCategories2.forEach((category) => {
      category.checked = false;
    });
  }
}
