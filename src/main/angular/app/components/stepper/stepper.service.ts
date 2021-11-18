import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LazyStepDirective} from "./step/lazy-step.directive";
import {Step} from "./step/step.model";

@Injectable()
export class StepperService {

  private _steps$ = new BehaviorSubject<LazyStepDirective[]>([]);
  steps$ = this._steps$.asObservable();

  private _currentStep$ = new BehaviorSubject<LazyStepDirective | null>(null);
  currentStep$ = this._currentStep$.asObservable();

  private _currentStepComponent$ = new BehaviorSubject<Step | null>(null);

  constructor() {
  }

  setCurrentStepComponent(step: Step) {
    this._currentStepComponent$.next(step);
  }

  addStep(step: LazyStepDirective): void {
    if (!this.currentStep) {
      this.currentStep = step;
    }
    this._steps$.next([...this._steps$.getValue(), step]);
  }

  removeStep(step: LazyStepDirective): void {
    const currentSteps = this._steps$.getValue();
    const stepIndexToRemove = currentSteps.findIndex(s => step === s);
    currentSteps.splice(stepIndexToRemove, 1);
    this._steps$.next(currentSteps);
  }

  gotoStepIndex(index: number) {
    const nextStep = this._steps$.getValue()[index];
    this._currentStep$.next(nextStep);
  }

  previous(): void {
    const currentStepIndex = this.currentStepIndex;
    this.gotoStepIndex(currentStepIndex - 1);
  }

  next(): void {
    const currentStepIndex = this.currentStepIndex;
    const currentStepComponent = this._currentStepComponent$.getValue();
    if (currentStepComponent && currentStepComponent.next) {
      currentStepComponent.next().then(_ => {
        this.gotoStepIndex(currentStepIndex + 1);
      }, _ => {

      });
    } else {
      this.gotoStepIndex(currentStepIndex + 1);
    }
  }

  complete(): void {

  }

  hasNext(): boolean {
    const totalIndexes = this._steps$.getValue().length - 1;
    const currentStepIndex = this.currentStepIndex;
    return currentStepIndex < totalIndexes;
  }

  hasPrevious(): boolean {
    return this.currentStepIndex > 0;
  }

  private get currentStepIndex(): number {
    const steps = this._steps$.getValue();
    return steps.findIndex(s => this.currentStep === s);
  }

  private set currentStep(step: LazyStepDirective | null) {
    this._currentStep$.next(step);
  }

  private get currentStep(): LazyStepDirective | null {
    return this._currentStep$.getValue();
  }
}


