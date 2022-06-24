import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { takeUntil, startWith, shareReplay, map } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * The footer of every page
 */
@Component({
  selector: 'broker-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit, OnDestroy {

  /** Complete image url to be loaded in the html */
  imageUrl$: Observable<string>;

  /** Destroy object to delete all subscribers */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  /** The default language of the broker picture */
  private defaultPicture  = 'NL'

  constructor(private ts: TranslateService) {   }

  ngOnInit(): void {
    // Observing the TranslateService
    this.imageUrl$ = this.ts.onLangChange
      .pipe(
          takeUntil(this.destroy$),
          startWith(  this.ts.currentLang ? this.ts.currentLang : 'NL'),
          map((ev : LangChangeEvent) => `./assets/imgs/Brocom${(ev.lang ? ev.lang.toLocaleUpperCase() : this.defaultPicture)}.svg`),
          shareReplay(1)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
