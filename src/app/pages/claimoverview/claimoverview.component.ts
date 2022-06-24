import { Router, } from '@angular/router';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { AxaAppConfig } from '@axa/ng-toolkit';
import { AppConfig } from '../../@auth/@model/app-config';
import { RoutesEnum } from 'src/app/@shared/routes.enum';
import { TranslateService } from '@ngx-translate/core';
import { PagesAbstractDirective } from '../pages.abstract';

/**
 * Component loading in the claim overview
 */
@Component({
  selector: 'broker-claimoverview',
  templateUrl: './claimoverview.component.html',
  styleUrls: ['./claimoverview.component.scss']
})
export class ClaimoverviewComponent extends PagesAbstractDirective implements OnInit {

  /** Cif that is given to the overview url
  * Needs to be an empty string to begin because of the html tag
  */
  cif : string;

  /** consult url links */
  consultUrl : string;

  constructor(private readonly renderer: Renderer2,
              private readonly config: AxaAppConfig<AppConfig>,
              private readonly router : Router,
              private ts : TranslateService)
  {
    super(renderer, config, router, ts);
    this.consultUrl = `${this.prefixUrl}/${RoutesEnum.CONSULT}`;
    this.cif = String(router.getCurrentNavigation().extras.state.cif);
    this.router.routerState.snapshot.root.data = {cif: this.cif};
  }

  ngOnInit() {
    const script = this.renderExternalScript(this.config.settings.urls.claimOverviewUrl);
    // append the script to the html when loaded
    this.renderer.appendChild(this.insertLocation.nativeElement, script);

    // scroll to the top of the screen
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
