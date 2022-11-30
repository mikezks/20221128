import { Injectable } from '@angular/core';
import { AppState } from './app-state.service';

@Injectable()
export class DefaultAppStateService implements AppState {
  private state = {
    name: 'Michael'
  };

  getState(): Record<string, string> {
    return this.state;
  }
}
