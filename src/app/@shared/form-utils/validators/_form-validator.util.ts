import { dateValidation } from './date.validatior';
import { hourValidation } from './hour.validator';
import { noFutureDateValidation } from './no-future-date.validator';
import { requiredIf } from './required-if-other.validator';

/** custom but convenient validator functions */
export const formValidator = {
  dateValidation,
  hourValidation,
  noFutureDateValidation,
  requiredIf
};
