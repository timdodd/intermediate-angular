import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-create-step3',
  templateUrl: './user-create-step3.component.html',
  styleUrls: ['./user-create-step3.component.scss']
})
export class UserCreateStep3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("init UserCreateStep3Component");
  }

}
