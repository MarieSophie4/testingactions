import { RESULTS_MOCK } from './mock.model';
import { SearchRequest } from './../../@model/search-request.model';
import { Injectable } from "@angular/core";
import { SearchResult } from '../../@model/search-result.model';
import { Observable, of } from 'rxjs';

/**
 * Service to search clients
 */
@Injectable({
  providedIn: 'root'
})
export class MockSearchservice {

  /**
   * Get the search results of the clients based on the search request
   * @param request
   * @returns
   */
  getClient(request: SearchRequest) : Observable<SearchResult[]> {

    return of(RESULTS_MOCK);
  }


}
