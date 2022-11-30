import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


export interface Config {
  useState: string;
}


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  config = new BehaviorSubject<Config>({
    useState: 'dummy'
  });
}
