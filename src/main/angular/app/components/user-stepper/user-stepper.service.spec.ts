import { TestBed } from '@angular/core/testing';

import { UserStepperService } from './user-stepper.service';

describe('UserStepperService', () => {
  let service: UserStepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStepperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
