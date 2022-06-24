import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { CookieService } from './@services/cookie.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class AuthModule {

  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    // Import verification
    if (parentModule) {
      throw new Error(`${String(parentModule)} has already been loaded. Import AuthModule in the AppModule only.`);
    }
  }
}
