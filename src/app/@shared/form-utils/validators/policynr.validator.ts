import { AbstractControl } from "@angular/forms";

/**
 * Validation of a policy number
 * Has to be of the format B1234 123 123 123 ( with or without spaces and B/b)
 * @param control
 * @returns
 */
export const policyNrValidation = (control: AbstractControl) : Record<string,string> | null => {
  if( !(control && control.value) )  {
    return null;
  }

  const regex = /^[Bb][\s/\s]*([\d]{4})[\s/\s]*([\d]{3})[\s]?([\d]{3})[\s]?([\d]{3})[\s]*$/;
  if( regex.test(String(control.value))){
    return null;

  }
  return {invalidMsg: 'error-messages.invalid-policy'  };
}
