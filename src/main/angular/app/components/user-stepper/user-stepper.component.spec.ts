import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStepperComponent } from './user-stepper.component';

describe('UserStepperComponent', () => {
  let component: UserStepperComponent;
  let fixture: ComponentFixture<UserStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
