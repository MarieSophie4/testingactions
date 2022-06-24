import { AbstractControl, Validators } from "@angular/forms";

/**
 * Form validator makes control required if another form control is equal to the compare value
 * @param otherFormControl name of the form control element
 * @param compare the value the 'otherFormControl' must have to make the control required
 * @returns validator
 */
export const  requiredIf  = (otherFormControl: string, compare: string) => (formControl: AbstractControl) : Validators => {
  if (!formControl.parent) {
    return null;
  }
  if (formControl.parent.get(otherFormControl).value === compare) {
    return Validators.required(formControl);
  }
  return null;
}
