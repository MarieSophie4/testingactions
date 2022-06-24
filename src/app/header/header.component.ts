import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';
import { Languages } from '../@shared/language.enum';

/**
 * The header component of every page
 */
@Component({
  selector: 'broker-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  /** Emit the changed language to the app component file */
  @Output() languageEmitter : EventEmitter<string> = new EventEmitter<string>();

  /** Language dropdown */
  langCurrent$ : Observable<string>;

  /** Array in string version for the dropdown  */
  langs : string;

  /** Default language */
  defaultLang : string;

  /** end object to stop subscribing on observables when on destroy is called */
  private readonly end$ = new Subject<boolean>();

  constructor(
    private ts: TranslateService,
  ) {   }

  ngOnInit(){
    // parse enum languages to a string
    const lengtsKeys = Object.keys(Languages).length
    this.langs = Object.keys(Languages).slice(lengtsKeys/ 2, lengtsKeys).toString();
    this.defaultLang = (this.ts.currentLang ? this.ts.currentLang.toUpperCase() : 'NL' );
  }

  ngOnDestroy(){
    this.end$.next(true);
    this.end$.complete();
  }

  /**
   * Function triggered by language change in html dropdown
   * @param lang chosen language
   */
  languageChange(lang :  string){
    this.languageEmitter.emit(lang);
  }
}
