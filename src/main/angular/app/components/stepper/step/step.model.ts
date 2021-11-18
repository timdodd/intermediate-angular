import {Observable} from "rxjs";

export interface Step {

  next?(): Promise<void> | Observable<boolean> | boolean;

  previous?(): Promise<void> | Observable<boolean> | boolean;

  loading?(): boolean;

  getNextStepLabel?(): string;

  getPreviousStepLabel?(): string;

}

