import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateStep4Component } from './user-create-step4.component';

describe('UserCreateStep4Component', () => {
  let component: UserCreateStep4Component;
  let fixture: ComponentFixture<UserCreateStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateStep4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
