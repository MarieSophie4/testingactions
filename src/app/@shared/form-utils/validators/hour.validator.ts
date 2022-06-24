import { AbstractControl } from '@angular/forms';

/**
 * Validates a given hour in a form
 * Expected format HH:MM
 * @param control the formcontrol
 * @returns A string with given Error msg or null (accepted hour)
 */
export const hourValidation = (control: AbstractControl) : Record<string, string> | null => {
  const invalidOptions : string[]  = [
    null,
    'error-messages.hour--to--big',
    'error-messages.minute--to--big',
    'error-messages.hour--minute--combination'
  ]
  if( !(control && control.value) )  {
    return { invalidMsg: 'error-messages.time--missing' };
  }

  const regex = /^(\d{1,2}):(\d{1,2})$/;
  if( regex.test(String(control.value))){
    const [hour, minute] = regex.exec(String(control.value)).splice(1,2);
    let invalid  = 0;
    invalid += +hour > 23 ? 1 : 0;
    invalid += +minute > 59 ? 2 : 0;
    return invalidOptions[invalid] === null ? null : {invalidMsg : invalidOptions[invalid] };

  }
  return {invalidMsg: 'error-messages.time--invalid' };
}
