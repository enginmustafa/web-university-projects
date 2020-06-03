import { TestBed } from '@angular/core/testing';

import { PrivilegedGuard } from './privileged.guard';

describe('PrivilegedGuard', () => {
  let guard: PrivilegedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrivilegedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
