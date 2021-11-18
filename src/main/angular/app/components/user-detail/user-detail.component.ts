import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  formGroup = this.createUserFormGroup();
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscribeToRouteParamChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addPhone(): void {
    this.phoneFormArray.push(this.createPhoneFormGroup());
  }

  saveUser(): void {
    const valueToSave = this.formGroup.value;
    this.userService.save(valueToSave)
      .subscribe(_ => this.router.navigateByUrl("/users"), httpError => {
        //handle errors
      });
  }

  get phoneFormArray(): FormArray {
    return this.formGroup.get('phones') as FormArray;
  }

  private refreshUser(userId: string): void {
    this.userService.get(userId).subscribe(user => this.setFormValue(user));
  }

  private setFormValue(user: User): void {
    this.formGroup.reset();
    user.phones.forEach(_ => this.phoneFormArray.push(this.createPhoneFormGroup()));
    this.formGroup.patchValue(user);
  }

  private subscribeToRouteParamChanges(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe(params => {
        const userId = params.get("userId");
        if (userId) {
          this.refreshUser(userId);
        } else {
          this.formGroup.reset();
        }
      })
    )
  }

  private createUserFormGroup(): FormGroup {
    return this.formBuilder.group({
      userId: null,
      firstName: null,
      lastName: null,
      username: null,
      phones: this.formBuilder.array([])
    });
  }

  private createPhoneFormGroup(): FormGroup {
    return this.formBuilder.group({
      phoneId: null,
      userId: null,
      phoneNumber: null,
      phoneType: null
    });
  }
}
