import { ExtensionComponent } from './extension/extension.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { ConsultComponent } from './consult/consult.component';
import { ClosureComponent } from './closure/closure.component';
import { ClaimoverviewComponent } from './claimoverview/claimoverview.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ClaimoverviewComponent,
    ClosureComponent,
    ConsultComponent,
    DeclarationComponent,
    ExtensionComponent
  ],
  imports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PagesModule { }
