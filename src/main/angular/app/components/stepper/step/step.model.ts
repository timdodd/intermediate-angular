export interface Step {

  next?(): Promise<void>;

  previous?(): Promise<void>;

  loading?(): boolean;

  getNextStepLabel?(): string;

  getPreviousStepLabel?(): string;

}

