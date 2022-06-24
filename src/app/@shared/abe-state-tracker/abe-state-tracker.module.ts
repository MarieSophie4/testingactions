import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbeStateTrackerDirective } from './abe-state-tracker.directive';



@NgModule({
  declarations: [ AbeStateTrackerDirective ],
  imports: [ CommonModule ],
  exports:  [ AbeStateTrackerDirective ],
})
export class AbeStateTrackerModule { }
