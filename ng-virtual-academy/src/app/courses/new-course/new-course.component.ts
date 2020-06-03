import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../../models/course.interface';
import { takeUntil } from 'rxjs/operators';
import { ValidatorUtil } from 'src/app/util/validator';
import { CourseService } from 'src/app/Services/courseService/course.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css', '../../style.css']
})
export class NewCourseComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private courseService: CourseService) {
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
      this.courseService.createCourse(this.defineNewCourse(formData)).pipe(
        takeUntil(this.destroy$)
      ).subscribe(response => {
        alert('Successfully created new course!')
        this.router.navigate(['courses']);
      });
  }
}

private defineNewCourse(formCourse: Course): Course {
    
  let course = <Course> {
    "title":formCourse.title,
    "description":formCourse.description,
    "date":formCourse.date,
    "rating":0,
    "userRatings": []
  }
  
  return course;
}
  
  private buildForm(): void {  
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(25)]],
      date: ['', Validators.required]
    });
  }


}
