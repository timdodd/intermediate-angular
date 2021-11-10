import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  formGroup = this.createFormGroup();
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

  save(): void {
    const valueToSave = this.formGroup.value;
    this.userService.save(valueToSave)
      .subscribe(_ => this.router.navigateByUrl("/users"), httpError => {
        //handle errors
      });
  }

  private refreshUser(userId: string): void {
    this.userService.get(userId).subscribe(user => this.formGroup.patchValue(user));
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

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: null,
      lastName: null,
      username: null
    });
  }
}
