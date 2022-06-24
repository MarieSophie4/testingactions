import { AbeAngularModule } from 'abe-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchClientComponent } from './search-client.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AbeStateTrackerModule } from '../@shared/abe-state-tracker/abe-state-tracker.module';

@NgModule({
  declarations: [
    SearchComponent,
    ResultsComponent,
    SearchClientComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    AbeAngularModule,
    AbeStateTrackerModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SearchClientModule { }
