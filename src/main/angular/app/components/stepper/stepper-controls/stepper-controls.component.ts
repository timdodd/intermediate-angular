import {Component} from '@angular/core';
import {StepperService} from "../stepper.service";

@Component({
  selector: 'app-stepper-controls',
  templateUrl: './stepper-controls.component.html',
  styleUrls: ['./stepper-controls.component.scss']
})
export class StepperControlsComponent {

  constructor(private stepperService: StepperService) {
  }

  previous(): void {
    this.stepperService.previous();
  }

  next(): void {
    this.stepperService.next();
  }

  hasNext(): boolean {
    return this.stepperService.hasNext();
  }

  hasPrevious(): boolean {
    return this.stepperService.hasPrevious();
  }
}
