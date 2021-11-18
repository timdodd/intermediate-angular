import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateStep3Component } from './user-create-step3.component';

describe('UserCreateStep3Component', () => {
  let component: UserCreateStep3Component;
  let fixture: ComponentFixture<UserCreateStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateStep3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
