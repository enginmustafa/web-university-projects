import { TestBed } from '@angular/core/testing';

import { EditingCourseGuard } from './editing-course.guard';

describe('EditingCourseGuard', () => {
  let guard: EditingCourseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditingCourseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
