import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css'],
})
export class FlightTypeaheadComponent {
  control = new FormControl('', { nonNullable: true });
  flights$ = this.getResultStream$();
  loading = false;

  constructor(private http: HttpClient) {
  }

  private getResultStream$(): Observable<Flight[]> {
    /**
     * Stream 1: Input control value changes
     *  - Trigger
     *  - State/data provider
     */
    return this.control.valueChanges.pipe(
      // Filtering START
      filter(city => city.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      // Filtering END
      tap(() => this.loading = true),
      /**
       * Stream 2: HTTP backend API call
       *  - State/data provider
       */
      switchMap(city => this.load(city)),
      tap(() => this.loading = false)
    );
  }

  /**
   * Stream 2: HTTP backend API call
   *  - State/data provider
   */
  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }
}
