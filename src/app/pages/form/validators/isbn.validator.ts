import { ValidatorFn, AbstractControl } from '@angular/forms';
import { ValidationError } from 'json-schema';

/**
 *
 * @param control
 */
export const isbnValidator: ValidatorFn = (
  control: AbstractControl
): ValidationError | null => {
  var isbnValue = control.value;
  const regex = new RegExp(
    /^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/
  );

  if (!!isbnValue) {
    return regex.test(isbnValue)
      ? null
      : {
          property: 'checkDigit',
          message: 'The ISBM format is not correct.',
        };
  } else {
    return null;
  }
};
