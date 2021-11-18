import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';
import {StepperService} from "../stepper.service";
import {StepDirective} from "../step/step.directive";
import {Step} from "../step/step.model";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {provide: StepperService}
  ]
})
export class StepperComponent implements AfterContentInit {

  @ContentChildren(StepDirective) steps: QueryList<StepDirective> | undefined;

  constructor(private stepperService: StepperService) {
  }

  ngAfterContentInit(): void {
    const currentStep = this.steps?.first;
    if (currentStep) {
      console.log(currentStep.component);
      this.stepperService.setCurrentStepComponent(currentStep.component as Step);
    }


  }


}
