import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/Services/courseService/course.service';

@Injectable({
  providedIn: 'root'
})
export class EditingCourseGuard implements CanActivate {

  constructor(private courseService: CourseService,
              private router: Router) {}


  //if no course is selected to edit, prevent loading edit component
  canActivate(): boolean {
    const course = this.courseService.getEditingCourse();
    if (!course) {
      this.router.navigate(['courses']);

      return false;
    }

    return true;
  }
}
