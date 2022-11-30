import { Injectable } from '@angular/core';
import { AppState } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class DummyAppStateService implements AppState {
  private state = {
    name: 'Petra'
  };

  getState(): Record<string, string> {
    return this.state;
  }
}
