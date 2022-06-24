import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { SearchResult } from './@model/search-result.model';
import { Router } from '@angular/router';
import { MockSearchservice } from './@services/mock/mock.service';
import { SearchRequest } from './@model/search-request.model';
import { RoutesEnum } from '../@shared/routes.enum';

/**
 * The search component, loading in the search and result components
 */
@Component({
  selector: 'broker-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 * Manages the search and results component
 */
export class SearchClientComponent implements OnDestroy {

  /** the search result of the request  */
  searchResults$: BehaviorSubject<SearchResult[]> = new BehaviorSubject<SearchResult[]>(null);

  /** Variable to show the results component */
  showResults  = false;

  /** Variable to unsubscribe to all elements in ondestroy */
  private readonly end$ = new Subject<boolean>();

  /** Subject to keep the spinner state */
  loading$ = new Subject<boolean>();

  constructor(
    private ss : MockSearchservice, // SearchService
    private router: Router,
    private ts: TranslateService
  ) {
      this.loading$.next(false);
    }

  /**
   * Search for clients
   * @param request
   */
  searchClient(request: SearchRequest){
    this.ss.getClient(request)
    .pipe(takeUntil(this.end$))
    .subscribe( value =>{
      this.searchResults$.next(value);
       this.showResults = true;
    })
  }

  /**
  * Selecting client from the table and routing to overview component
  * @param cifRequest
  */
  selectionClient(cifRequest: string){
    void this.router.navigate([RoutesEnum.OVERVIEW], { state : {cif: cifRequest}});
    this.router.routerState.snapshot.root.data = {cif: cifRequest};
  }

  ngOnDestroy(){
    this.end$.next(true);
    this.end$.complete();
  }


}
