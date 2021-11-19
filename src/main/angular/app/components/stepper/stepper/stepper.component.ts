import {AfterContentInit, Component, ContentChildren, OnDestroy, QueryList} from '@angular/core';
import {StepperService} from "../stepper.service";
import {StepDirective} from "../step/step.directive";
import {Step} from "../step/step.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: StepperService
    }
  ]
})
export class StepperComponent implements AfterContentInit, OnDestroy {

  @ContentChildren(StepDirective) steps: QueryList<StepDirective> = new QueryList<StepDirective>();

  private subscriptions: Subscription[] = [];

  constructor(private stepperService: StepperService) {
  }

  ngAfterContentInit(): void {
    this.setCurrentStep(this.steps);
    this.subscribeToStepChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private subscribeToStepChanges(): void {
    this.subscriptions.push(
      this.steps?.changes.subscribe(queryList => {
        this.setCurrentStep(queryList);
      })
    );
  }

  private setCurrentStep(queryList: QueryList<StepDirective>) {
    const currentStep = queryList?.first;
    if (currentStep) {
      this.stepperService.setCurrentStepComponent(currentStep.component as Step);
    }
  }
}



