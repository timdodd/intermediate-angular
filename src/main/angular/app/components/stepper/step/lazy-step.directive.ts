import {Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {StepperService} from "../stepper.service";

@Directive({
  selector: '[appLazyStep]'
})
export class LazyStepDirective implements OnInit, OnDestroy {

  private isShown = false;

  constructor(private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private stepperService: StepperService) {
  }

  ngOnInit(): void {
    this.stepperService.addStep(this);
    this.stepperService.currentStep$.subscribe(s => {
      if (s === this) {
        this.show();
      } else {
        this.hide();
      }
    })
  }

  ngOnDestroy(): void {
    this.stepperService.removeStep(this);
  }

  show(): void {
    if (!this.isShown) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isShown = true;
    }
  }

  hide(): void {
    this.viewContainer.clear();
    this.isShown = false;
  }
}
