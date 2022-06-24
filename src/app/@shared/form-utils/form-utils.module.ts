import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],

  exports: []
})
export class FormUtilsModule { }

// additonal exports in the custom forms module
export { NamedFormGroup, namedFormGroupParser, Like } from './model/named-formgroup.model';
export { formValidator as FormValidator } from './validators/_form-validator.util';
