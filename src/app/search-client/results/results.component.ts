import { BehaviorSubject, Subject } from 'rxjs';
import { SearchResult } from './../@model/search-result.model';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'broker-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component visualizing the results and redirecting to selected client
 */
export class ResultsComponent implements OnInit, OnDestroy {

  /** The data of the clients based on the search result */
  @Input() searchResults: BehaviorSubject<SearchResult[]> = new BehaviorSubject<SearchResult[]>([null]);

  /** The selected client - output handled in search-client.component.ts */
  @Output() selectionTable = new EventEmitter<SearchResult>();

  // Table variables
  /** The number of results - needed for visualization  */
  resultsNumber : number;

  /** Pages of the table */
  pages : number;

  /** Current page of the results table */
  currentTablePage : BehaviorSubject<number> = new BehaviorSubject<number>(0);

  /** A part of the result that is shown on the current table page */
  currentTableElements$ : BehaviorSubject<SearchResult[]>;

  /** The number of rows visible in the table */
  private readonly ROWS = 6;

  /** Destory object to unsubscribe subcribers when component is destoryed */
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {

    const resultsValues = this.searchResults.getValue();
    this.resultsNumber = resultsValues.length;
    this.pages = Math.ceil(resultsValues.length/this.ROWS);
    this.currentTableElements$ = new BehaviorSubject<SearchResult[]>(resultsValues.slice(0,this.ROWS));

    this.currentTablePage
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (e) => {
        this.currentTableElements$.next(resultsValues.slice( this.ROWS*(e) , (this.ROWS*(e+1))))
      }
    )

    // Scroll to the table when the results are there
    document.getElementById("results-table").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Changes the visible table rows
   * @param event
   */
  changeTablePage(event: number){
    let newPage : number = event;
     if(event === -1){
      newPage = (this.currentTablePage.value-1) < 0 ? null : this.currentTablePage.value-1;
    } else if(event === -2) {
      newPage = (this.currentTablePage.value+1) >= (this.pages) ? null : this.currentTablePage.value+1;
    }

    if(newPage != null){
      this.currentTablePage.next(newPage);
    }
  }

  /**
   * Create an array of the size of i, needed for html page
   * @param i
   * @returns
   */
  counter(i: number) : number[] {
    return new Array<number>(i);
  }
}
