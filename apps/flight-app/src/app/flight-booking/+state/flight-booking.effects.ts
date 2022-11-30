import { Injectable } from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import * as FlightBookingActions from './flight-booking.actions';


@Injectable()
export class FlightBookingEffects {

  loadFlights$ = createEffect(() =>
    /**
     * Stream 1:
     *  - Trigger
     *  - State/data provider
     */
    this.actions$.pipe(
      // Filtering
      ofType(FlightBookingActions.flightsLoad),
      /**
       * Stream 2: HTTP backend API call
       *  - State/data provider
       */
      switchMap(action => this.flightService.find(
        action.from,
        action.to,
        action.urgent
      )),
      // Transformation
      map(flights => FlightBookingActions.flightsLoaded({ flights }))
    )
  );

  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}
}
