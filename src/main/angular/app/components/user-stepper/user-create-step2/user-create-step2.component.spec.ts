import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateStep2Component } from './user-create-step2.component';

describe('UserCreateStep2Component', () => {
  let component: UserCreateStep2Component;
  let fixture: ComponentFixture<UserCreateStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateStep2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
