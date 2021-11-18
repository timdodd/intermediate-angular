import {AfterViewInit, Directive, ViewContainerRef} from "@angular/core";
import {Step} from "./step.model";

@Directive({
  selector: '[appStep]'
})
export class StepDirective implements AfterViewInit {

  component: Step | undefined;

  constructor(private viewContainer: ViewContainerRef) {
  }

  ngAfterViewInit(): void {
    this.component = (<any>this.viewContainer)._lContainer[0][8];
  }
}
