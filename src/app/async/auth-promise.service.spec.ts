import { TestBed, inject } from '@angular/core/testing';

import { AuthPromiseService } from './auth-promise.service';

describe('AuthPromiseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPromiseService]
    });
  });

  it('should be created', inject([AuthPromiseService], (service: AuthPromiseService) => {
    expect(service).toBeTruthy();
  }));
});
