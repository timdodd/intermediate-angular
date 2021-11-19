import {Component, OnInit} from '@angular/core';
import {Step} from "../../stepper/step/step.model";

@Component({
  selector: 'app-user-create-step2',
  templateUrl: './user-create-step2.component.html',
  styleUrls: ['./user-create-step2.component.scss']
})
export class UserCreateStep2Component implements OnInit, Step {

  constructor() {
  }

  ngOnInit(): void {
    console.log("init UserCreateStep2Component");
  }

  next(): Promise<void> {
    return new Promise((resolve, reject) => {
      reject();
    });
  }
}
