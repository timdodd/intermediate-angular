import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserStepperService} from "../user-stepper.service";
import {Step} from "../../stepper/step/step.model";

@Component({
  selector: 'app-user-create-step1',
  templateUrl: './user-create-step1.component.html',
  styleUrls: ['./user-create-step1.component.scss']
})
export class UserCreateStep1Component implements OnInit, Step {

  formGroup = this.createUserFormGroup();

  constructor(private formBuilder: FormBuilder,
              private userStepperService: UserStepperService) {
  }

  ngOnInit(): void {
    this.formGroup.patchValue(this.userStepperService.data);
  }

  next(): Promise<void> {

    return new Promise((resolve, reject) => {
      Object.assign(this.userStepperService.data, this.formGroup.value);
      reject();
    });
  }

  getStepLabel(): string {
    return "Step uno!"
  }

  private createUserFormGroup(): FormGroup {
    return this.formBuilder.group({
      userId: null,
      firstName: null,
      lastName: null,
      username: null
    });
  }
}
