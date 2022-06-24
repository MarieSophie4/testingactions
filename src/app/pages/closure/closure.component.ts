import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxaAppConfig } from '@axa/ng-toolkit';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppConfig } from 'src/app/@auth/@model/app-config';
import { PagesAbstractDirective } from '../pages.abstract';

/**
 * Component loading in the closure component
 */
@Component({
  selector: 'broker-closure',
  templateUrl: './closure.component.html',
  styleUrls: ['./closure.component.scss']
})
export class ClosureComponent extends PagesAbstractDirective implements OnInit, OnDestroy {

  /** Destroy object to delete all subscribers */
  protected destroy$: Subject<boolean> = new Subject<boolean>();

  claim  = '';

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
    const script = this.renderExternalScript(this.config.settings.urls.closureUrl);
    this.renderer.appendChild(this.insertLocation.nativeElement, script);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
