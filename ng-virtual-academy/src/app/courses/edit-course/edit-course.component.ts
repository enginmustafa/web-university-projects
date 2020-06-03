import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/Services/courseService/course.service';
import { ValidatorUtil } from 'src/app/util/validator';
import { takeUntil } from 'rxjs/operators';
import { Course } from '../../models/course.interface';
import { UserService } from 'src/app/Services/userService/user.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css', '../../style.css']
})
export class EditCourseComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;
  selectedCourse: Course;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private courseService: CourseService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    this.errorMessage=null;
    const formData = this.form.value;
    
    let validator: ValidatorUtil = new ValidatorUtil(this.form);

    //check for any field errors
    if (!validator.isValid()) {      
      this.errorMessage = validator.getError();

    }
    else {
          let editedCourse = this.updateProperties(formData);

          //if not null, update
          if(editedCourse) {
              this.courseService.edit(editedCourse).pipe(
                takeUntil(this.destroy$)
              ).subscribe(response => {
                  //update course on favoritecourses of users, if it was favorite of any
                  this.updateUserFavoriteCourse(response);

                  this.router.navigate(['courses'])
                  alert('Course was updated successfully!')
              });
          }
          //no changes made, show error
          else{
            this.errorMessage='Field values are identical.'
          }
  }
}

//update course on users favorite course list after editing
private updateUserFavoriteCourse(course: Course): void {
  this.userService.getUsers().subscribe(users => {
    users.forEach(user => {
      if(user.favoriteCourses) {
        user.favoriteCourses.forEach(favoriteCourse => {
          if(favoriteCourse.id==course.id) {
              let courseIndex = user.favoriteCourses.indexOf(favoriteCourse);
              
              user.favoriteCourses[courseIndex] = course;

              this.userService.edit(user).pipe(
                takeUntil(this.destroy$)
              ).subscribe(response => {
                //user's favorite course edited to match current values
              });
          }
        });
      }
    });    
  });
}

  private updateProperties(formCourse: Course): Course {
    let hasChanges: Boolean;
    let course: Course;

    course = this.selectedCourse;

    if(course.title != formCourse.title){
      course.title = formCourse.title;
      hasChanges=true;
    }

    if(course.description != formCourse.description) {
      course.description=formCourse.description;
      hasChanges=true;
    }

    if(course.date != formCourse.date) {
      course.date=formCourse.date;
      hasChanges=true;
    }
    
    if(!hasChanges)
      course = null;

    return course;
}
  
  private buildForm(): void {
    this.selectedCourse = this.courseService.getEditingCourse();
  
    this.form = this.fb.group({
      title: [this.selectedCourse.title, [Validators.required, Validators.minLength(3)]],
      description: [this.selectedCourse.description, [Validators.required, Validators.minLength(25)]],
      date: [this.selectedCourse.date, Validators.required],
      
      //no validators -> cant be edited, rating will be generated based on course ratings
      rating: [{value: this.selectedCourse.rating, disabled: true}]
    });
  }
}
