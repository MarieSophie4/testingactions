import { CookieService } from './@auth/@services/cookie.service';
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxaAppConfig } from '@axa/ng-toolkit';
import { AppConfig } from './@auth/@model/app-config';
import { Cookies } from './@shared/cookies.enum';

/**
 * The starting component of the application
 */
@Component({
  selector: 'broker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements AfterViewInit {

  constructor(
    private readonly ts: TranslateService,
    private readonly route : ActivatedRoute,
    private readonly router : Router,
    private config: AxaAppConfig<AppConfig>,
    private readonly cookieService : CookieService
  ) { }

  ngAfterViewInit() {
    const lang = this.cookieService.get(Cookies.AXA_LANG_COOKIE);
    this.ts.use(lang ? lang.toLowerCase() : 'nl');
    this.cookieService.set({name: Cookies.AXA_LANG_COOKIE ,value: this.ts.currentLang })
  }

  /**
   * When language is changed, change the corresponding cookie
   * @param event
   */   
  languageChanged(event : any){
    this.ts.use(event.toLowerCase());
    this.cookieService.set({name: Cookies.AXA_LANG_COOKIE ,value: event, expires : 730,  path : '/', secure : true });
  }

  /**
   * Clearing the query parameters from the url
   */
  private clearParams(){
    void this.router.navigate(
      ['.'],
      { relativeTo: this.route, queryParams: {  } }
    );
  }


}
