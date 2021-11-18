export interface Step {

  next(): Promise<void>;

  getStepLabel(): string;
}
