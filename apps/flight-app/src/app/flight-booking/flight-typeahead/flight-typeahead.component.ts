import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, share, Subject, Subscription, takeUntil, tap, timer } from 'rxjs';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css'],
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  protected timer$ = timer(0, 1_000).pipe(
    tap(value => console.log('Observable processing', value)),
    takeUntil(this.destroy$),
    share(),
  );
  private subscriptions = new Subscription();

  constructor() {
    this.rxjsDemo();
  }

  ngOnInit(): void {}

  private rxjsDemo(): void {
    this.subscriptions.add(
      this.timer$.subscribe(console.log)
    );
  }

  getTimerStream$(): Observable<number> {
    return this.timer$;
  }

  ngOnDestroy(): void {
    // this.subscriptions.unsubscribe();
    this.destroy$.next();
  }
}
