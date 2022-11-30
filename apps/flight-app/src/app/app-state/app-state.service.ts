import { DummyAppStateService } from './dummy-app-state.service';
import { DefaultAppStateService } from './default-app-state.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  useClass: DummyAppStateService
})
export abstract class AppState {
  abstract getState(): Record<string, string>;
}
