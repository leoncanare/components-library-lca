import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { SelectOption } from '../models/components.models';
import { MatSelectModule } from '@angular/material/select';
import {
  AlignVariant,
  ButtonVariant,
  GenderVariant,
  PaleteVariant,
  PredictiveType,
  SizeVariant,
  TextVariant,
} from '../types/components.types';
import {
  animalsOptions,
  clientsOptions,
  fruitsOptions,
} from '../mocks/selector-options.mock';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playground-pannel',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './playground-pannel.component.html',
  styleUrls: ['./playground-pannel.component.scss'],
})
export class PlaygroundPannelComponent implements OnInit {
  openPlayground = false;

  @Input() playgroudType:
    | 'select'
    | 'button'
    | 'checkbox'
    | 'radio'
    | 'toggle'
    | 'dialog'
    | 'tooltip'
    | 'textarea'
    | 'input' 
    | 'datepicker' = 'select';

  /** Generic - Controlls [OUT] */
  palete: PaleteVariant = 'LCA_PALETE';

  @Output() paleteOut = new EventEmitter<PaleteVariant>();
  @Output() labelOut = new EventEmitter<string>();
  @Output() disabledOut = new EventEmitter<boolean>();
  @Output() widthOut = new EventEmitter<string>();
  @Output() placeholderOut = new EventEmitter<string>();
  @Output() helperOut = new EventEmitter<string>();
  @Output() defaultValueOut = new EventEmitter<string>();
  @Output() sizeOut = new EventEmitter<SizeVariant>();
  @Output() maxLengthOut = new EventEmitter<number>();

  /** Select - Variables */
  animals: SelectOption[] = animalsOptions;
  fruits: SelectOption[] = fruitsOptions;
  clients: SelectOption[] = clientsOptions;
  options!: SelectOption[];

  /** Select - Controlls [OUT] */
  @Output() optionsOut = new EventEmitter<SelectOption[]>();
  @Output() sizeAutoscrollOut = new EventEmitter<number>();
  @Output() allOptionOut = new EventEmitter<boolean>();
  @Output() everAllOptionOut = new EventEmitter<boolean>();
  @Output() shortDropdownOut = new EventEmitter<boolean>();
  @Output() genderOut = new EventEmitter<GenderVariant>();
  @Output() alphabeticalOut = new EventEmitter<boolean>();
  @Output() descriptionOut = new EventEmitter<boolean>();
  @Output() descriptionFilterOut = new EventEmitter<boolean>();
  @Output() predictiveTypeOut = new EventEmitter<PredictiveType>();

  /** Button - Controlls [OUT] */
  buttonVariant: ButtonVariant = 'primary';

  @Output() variantOut = new EventEmitter<ButtonVariant>();
  @Output() textStyleOut = new EventEmitter<TextVariant>();
  @Output() iconOut = new EventEmitter<string>();

  /** Checkbox - Controlls [OUT] */
  @Output() checkedOut = new EventEmitter<boolean>();
  @Output() secondaryCheckboxOut = new EventEmitter<boolean>();

  /** Toggle - Controlls [OUT] */
  @Output() toggleIconsOut = new EventEmitter<boolean>();
  @Output() toggleIconsActiveOut = new EventEmitter<string>();
  @Output() toggleIconsDeactiveOut = new EventEmitter<string>();

  /** Dialog - Controlls [OUT] */
  ngDialog: boolean = false;
  dialogTitle: string = '';
  dialogText: string = '';
  primaryBtn: boolean = true;
  secondaryBtn: boolean = true;
  primaryLabel: string = '';
  secondaryLabel: string = '';

  @Output() dialogTypeOut = new EventEmitter<boolean>();
  @Output() dialogTimerOut = new EventEmitter<number>();
  @Output() dialogBackGroundBlockOut = new EventEmitter<boolean>();
  @Output() dialogTitleOut = new EventEmitter<string>();
  @Output() dialogImageOut = new EventEmitter<string>();
  @Output() dialogTextOut = new EventEmitter<string>();
  @Output() dialogPrimaryBtnOut = new EventEmitter<boolean>();
  @Output() dialogPrimaryLabelBtnOut = new EventEmitter<string>();
  @Output() dialogSecondaryBtnOut = new EventEmitter<boolean>();
  @Output() dialogSecondaryLabelBtnOut = new EventEmitter<string>();

  /** Tooltip - Controlls [OUT] */
  @Output() tooltipTitleOut = new EventEmitter<string>();
  @Output() tooltipTextOut = new EventEmitter<string>();
  @Output() tooltipAlignOut = new EventEmitter<AlignVariant>();
  @Output() tooltipVerticalInvertOut = new EventEmitter<boolean>();

  /** Textarea - Controlls [OUT] */
  @Output() heightOut = new EventEmitter<string>();
  @Output() counterOut = new EventEmitter<boolean>();

  /** Input - Controlls [OUT] */
  inputType: string = 'text';
  customBehavior!: string;

  @Output() tooltipDialogOut = new EventEmitter<boolean>();
  @Output() inputTypeOut = new EventEmitter<string>();
  @Output() customBehaviorOut = new EventEmitter<string>();
  @Output() prefixOut = new EventEmitter<string>();
  @Output() suffixOut = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  handleOpenPlayground(): void {
    this.openPlayground = !this.openPlayground;
  }

  hadleChange(value: any, refControl: string): void {
    switch (refControl) {
      case 'palete':
        this.paleteOut.emit(value);
        break;
      case 'label':
        this.labelOut.emit(value);
        break;
      case 'disabled':
        this.disabledOut.emit(value);
        break;
      case 'width':
        this.widthOut.emit(value);
        break;
      case 'size':
        this.sizeOut.emit(value);
        break;
      case 'placeholder':
        this.placeholderOut.emit(value);
        break;
      case 'helper':
        this.helperOut.emit(value);
        break;
      case 'defaultValue':
        this.defaultValueOut.emit(value);
        break;
      case 'sizeAutoscroll':
        this.sizeAutoscrollOut.emit(value);
        break;
      case 'allOption':
        this.allOptionOut.emit(value);
        break;
      case 'shortDropdown':
        this.shortDropdownOut.emit(value);
        break;
      case 'gender':
        this.genderOut.emit(value);
        break;
      case 'orderAlphabetical':
        this.alphabeticalOut.emit(value);
        break;
      case 'description':
        this.descriptionOut.emit(value);
        break;
      case 'descriptionFilter':
        this.descriptionFilterOut.emit(value);
        break;
      case 'predictiveType':
        this.predictiveTypeOut.emit(value);
        break;
      case 'options':
        this.optionsOut.emit(value);
        break;
      /** BUTTON */
      case 'buttonType':
        this.variantOut.emit(value);
        this.buttonVariant = value;
        break;
      case 'textStyle':
        this.textStyleOut.emit(value);
        break;
      case 'icon':
        this.iconOut.emit(value);
        break;
      /** CHECKBOX */
      case 'checked':
        this.checkedOut.emit(value);
        break;
      case 'secondary-checkbox':
        this.secondaryCheckboxOut.emit(value);
        break;
      /** TOGGLE */
      case 'toggle-icons':
        this.toggleIconsOut.emit(value);
        break;
      case 'toggle-icon-active':
        this.toggleIconsActiveOut.emit(value);
        break;
      case 'toggle-icon-deactive':
        this.toggleIconsDeactiveOut.emit(value);
        break;
      /** DIALOG */
      case 'dialog-type':
        this.dialogTypeOut.emit(value);
        if (value) {
          this.dialogTitle = '';
          this.dialogText = '';
          this.primaryBtn = false;
          this.secondaryBtn = false;
          this.primaryLabel = '';
          this.secondaryLabel = '';
        } else {
          this.primaryBtn = true;
          this.secondaryBtn = true;
        }
        break;
      case 'dialog-timer':
        this.dialogTimerOut.emit(value);
        break;
      case 'dialog-background-block':
        this.dialogBackGroundBlockOut.emit(value);
        break;
      case 'dialog-title':
        this.dialogTitleOut.emit(value);
        break;
      case 'dialog-image':
        this.dialogImageOut.emit(value);
        break;
      case 'dialog-text':
        this.dialogTextOut.emit(value);
        break;
      case 'dialog-primary-btn':
        this.dialogPrimaryBtnOut.emit(value);
        break;
      case 'primary-label':
        this.dialogPrimaryLabelBtnOut.emit(value);
        break;
      case 'dialog-secondary-btn':
        this.dialogSecondaryBtnOut.emit(value);
        break;
      case 'secondary-label':
        this.dialogSecondaryLabelBtnOut.emit(value);
        break;
      /** TOOLTIP */
      case 'tooltip-title':
        this.tooltipTitleOut.emit(value);
        break;
      case 'tooltip-text':
        this.tooltipTextOut.emit(value);
        break;
      case 'tooltip-align':
        this.tooltipAlignOut.emit(value);
        break;
      case 'vertical-invert':
        this.tooltipVerticalInvertOut.emit(value);
        break;
      /** TEXTAREA */
      case 'height':
        this.heightOut.emit(value);
        break;
      case 'counter':
        this.counterOut.emit(value);
        break;
      case 'max-length':
        this.maxLengthOut.emit(value);
        break;
      /** INPUT */
      case 'input-tooltip-dialog':
        this.tooltipDialogOut.emit(value);
        break;
      case 'input-type':
        this.customBehavior = '';
        this.inputTypeOut.emit(value);
        break;
      case 'custom-behavior':
        this.customBehaviorOut.emit(value);
        break;
      case 'prefix':
        this.prefixOut.emit(value);
        break;
      case 'suffix':
        this.suffixOut.emit(value);
        break;
    }
  }
}
