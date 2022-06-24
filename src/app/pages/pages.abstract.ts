import { Directive, ElementRef, OnDestroy, Renderer2, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AxaAppConfig } from "@axa/ng-toolkit";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AppConfig } from "../@auth/@model/app-config";
import { RoutesEnum } from "../@shared/routes.enum";
import { Pages } from "./page.interface";

/**
 * Implements the Pages interface
 * Works as a base for the differenct component pages
 */
@Directive({
  selector: '[brokerPagesAbstract]'
})
export abstract class PagesAbstractDirective implements Pages, OnDestroy {

  /** Connects with element in html */
  @ViewChild('insertLocation', { static: true }) insertLocation: ElementRef;

  /** Origin to authenticate the correct user */
  origin = "brokerportal"

  /** The redirect url for the overview component */
  overviewUrl : string;

  /** Prefix for redirecting depinding on the locationb */
  prefixUrl : string;

  /** Language to pass through other components */
  language : string//Observable<string>;

  /** Destroy object to delete all subscribers */
  protected destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(renderer: Renderer2,
      config: AxaAppConfig<AppConfig>,
      router : Router,
      ts : TranslateService)
  {
    this.overviewUrl = `${this.prefixUrl}/${RoutesEnum.OVERVIEW}`;
    this.prefixUrl = config.settings.auth0.redirectUri;

    this.language = ts.currentLang;

    ts.onLangChange.pipe(
            takeUntil(this.destroy$),
      ).subscribe(
      ev => {
        this.language = ev.lang;
      }
    )
  }

  /**
   * Render a script in module form
   * @param src the source of the script through a link
   * @returns
   */
  renderExternalScript(src: string): HTMLScriptElement {
    const script : HTMLScriptElement = document.createElement('script');
    script.type = 'module';
    script.src = src;
    script.async = true;
    script.defer = true;
    return script;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
