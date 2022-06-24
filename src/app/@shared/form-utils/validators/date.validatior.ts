import { AbstractControl, ValidatorFn } from "@angular/forms";
import { dateMapperFunctionality } from "../utils/datemapper.util";

/**
 * Will validate if a date is filled in with the format dd/MM/yyyy
 * @param control
 * @returns todo
 */
export const dateValidation: ValidatorFn = (control: AbstractControl) => {
  if(control.value === (null || undefined || '') || !control.value){
    return null;
  }

  if(dateMapperFunctionality.fromString(String(control.value)) === (null || undefined) ){
    return { invalidMsg: 'error-messages.date--invalid--format' } ;
  }
  return null;
}
