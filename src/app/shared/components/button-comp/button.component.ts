import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IncludesPipe } from '../../pipes/includes.pipe';
import { ButtonVariant, PaleteVariant, SizeVariant, TextVariant } from '../../types/components.types';
import { SetPalete } from '../../colors/palete.adapter'

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule, 
    IncludesPipe
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  /**
   * Change the palete of component.
   */
  @Input() palete: PaleteVariant = 'LCA_PALETE';
  /**
   * Button status. If optional event "actionClick" is defined, only runs when this parameters is false.
   */
  @Input() disabled = false;

  /**
   * Button style based in its variant
   */
  @Input() variant: ButtonVariant = 'primary';

  /**
   * How large should the button be?
   */
  @Input() size: SizeVariant = 'standard';

  /**
   * Button text style
   */
  @Input() textStyle: TextVariant = 'uppercase';

  /**
   * Button contents
   *
   * @required
   */
  @Input() label! : string;

  /**
   * Optional button icon
   * IMPORTANT: Use a SVG resource so the icon color change automatically depending on its state
   */
  @Input() icon?: string;

  /**
   * Apply styles when button is focused
   */
  @Input() applyFocus = false;

  /**
   * Show button as selected
   */
  @Input() selected = false;

  /**
   * Type attribute for <button> HTML tag
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Optional custom hover to input buttons.
   */
  @Input() inputButton = false;

  /**
   * Optional custom width. You can set any valid CSS value
   */
  @Input() width?: string;

  /**
   * Optional custom min-width. You can set any valid CSS value
   */
  @Input() minWidth?: string;

  /**
   * Optional event click. This event only runs when the parameter "disabled" is false
   */
  @Output() actionClick = new EventEmitter();

  /**
   * Button variants that allow showing an icon
   */
  readonly iconVariants: ButtonVariant[] = [
    'primary',
    'secondary',
    'tertiary',
    'toggle',
    'action-primary',
    'circle-primary',
    'circle-secondary',
    'icon-button',
  ];

  /**
   * Button variants that don't allow showing a label
   */
  readonly notLabelVariants: ButtonVariant[] = [
    'circle-primary',
    'circle-secondary',
    'icon-button',
  ];

  /**
   * Button CSS classes to use depending on the component parameters
   */
  get buttonClasses(): string[] {
    return this.selected
      ? [
          'lca-button',
          `lca-button__${this.variant}`,
          `lca-button__${this.size}`,
          `allowfocus-${this.applyFocus}`,
          'selected',
        ]
      : this.inputButton
      ? [
          'lca-button',
          `lca-button__${this.variant}`,
          `lca-button__${this.size}`,
          `allowfocus-${this.applyFocus}`,
          'input-button',
        ]
      : [
          'lca-button',
          `lca-button__${this.variant}`,
          `lca-button__${this.size}`,
          `allowfocus-${this.applyFocus}`,
        ];
  }

  ngOnInit(): void {
    SetPalete(this.palete);
  }

  handleButton() {
    !this.disabled && this.actionClick.emit();
  }
}
