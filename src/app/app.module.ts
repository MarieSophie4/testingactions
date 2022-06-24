import { SearchClientModule } from './search-client/search-client.module';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AxaAppConfig, initializeAxaConfig } from '@axa/ng-toolkit';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Location } from '@angular/common';
import { AuthModule } from './@auth/auth.module';
import { AppConfigLoader, initializeConfigLoader } from './app-config-loader';
import { FormUtilsModule } from './@shared/form-utils/form-utils.module';
import { PagesModule } from './pages/pages.module';

/**
 * Function to load in correct translation
 * @param _http
 * @param location
 * @returns
 */
export function httpLoaderFactory(_http: HttpBackend, location: Location) : TranslateHttpLoader {
  return new TranslateHttpLoader(new HttpClient(_http), './assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    PagesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SearchClientModule,
    AuthModule,
    FormUtilsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpBackend]
      },
      isolate: true
    })
  ],
  providers: [
    { provide: AxaAppConfig, useClass: AppConfigLoader },
    { provide: initializeAxaConfig, useExisting: initializeConfigLoader },
		{ provide: APP_INITIALIZER, useFactory: initializeAxaConfig, deps: [AxaAppConfig], multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }


