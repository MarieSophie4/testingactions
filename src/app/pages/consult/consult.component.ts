import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxaAppConfig } from '@axa/ng-toolkit';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppConfig } from 'src/app/@auth/@model/app-config';
import { RoutesEnum } from 'src/app/@shared/routes.enum';
import { PagesAbstractDirective } from '../pages.abstract';

/**
 * Component loading in the consult component
 */
@Component({
  selector: 'broker-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent extends PagesAbstractDirective implements OnInit, OnDestroy {

  /** Destroy object to delete all subscribers */
  protected destroy$: Subject<boolean> = new Subject<boolean>();

  claim  = '';
  extensionUrl : string;

  constructor(private readonly renderer: Renderer2,
    private readonly config: AxaAppConfig<AppConfig>,
    private readonly router : Router, private activatedRoute : ActivatedRoute,
    private readonly ts : TranslateService)
  {
    super(renderer, config, router, ts);

    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe( params => {
        this.claim = String(params['claim']);
    });
  }

  ngOnInit(): void {
    this.extensionUrl = `${this.prefixUrl}/${  RoutesEnum.EXTENSION }`;

    const script = this.renderExternalScript(this.config.settings.urls.consultUrl);
    this.renderer.appendChild(this.insertLocation.nativeElement, script);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
