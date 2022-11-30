import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { DefaultAppStateService } from './default-app-state.service';
import { DummyAppStateService } from './dummy-app-state.service';

@Injectable({
  providedIn: 'root',
  useFactory: (configService: AppConfigService) => {
    if (configService.config.value.useState === 'default') {
      return new DefaultAppStateService();
    }

    return new DummyAppStateService();
  },
  deps: [AppConfigService]
})
export abstract class AppState {
  abstract getState(): Record<string, string>;
}
