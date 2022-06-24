import { AbstractControl } from "@angular/forms";
import { dateMapperFunctionality } from "../utils/datemapper.util";
import { dateValidation } from "./date.validatior";

/**
 * Checks if the given date from the form is not in the future
 * Format of the date must be: dd/MM/yyyy
 * @param control: the formcontrol
 * @returns  A string with given Error msg or null (accepted date)
 */
 export const noFutureDateValidation = (control: AbstractControl) : Record<string,string> | null => {
  const basicValidation = dateValidation(control);
  if(basicValidation == null){
    const today = new Date();
    const dateTransformed : Date = dateMapperFunctionality.fromString(String(control.value));
    return (dateMapperFunctionality.compare(dateTransformed, today)) > 0 ?
    { invalidMsg: 'error-messages.date--not--future' } : null;
  }
  return basicValidation;
}
