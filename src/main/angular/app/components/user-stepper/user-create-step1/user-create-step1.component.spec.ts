import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateStep1Component } from './user-create-step1.component';

describe('UserCreateStep1Component', () => {
  let component: UserCreateStep1Component;
  let fixture: ComponentFixture<UserCreateStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateStep1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
