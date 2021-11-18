import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-create-step2',
  templateUrl: './user-create-step2.component.html',
  styleUrls: ['./user-create-step2.component.scss']
})
export class UserCreateStep2Component implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    console.log("step 2 on init");
  }

}
