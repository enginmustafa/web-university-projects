import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/models/course.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  readonly url = 'http://localhost:3000/courses';

  //course that has been selected to edit
  editingCourse: Course;

  constructor(private http: HttpClient){
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }

  getCourse(course:Course): Observable<Course> {
    return this.getCourses().pipe(
      map((response: Course[]) => response.find(dbCourse => dbCourse.id === course.id))
    );
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.url, course);
  }

  edit(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${course.id}`, course);
  }

  delete(course: Course): Observable<Course> {
    return this.http.delete<Course>(`${this.url}/${course.id}`);
  }

  setEditingCourse(course: Course): void {
    this.editingCourse = course;
  }

  getEditingCourse(): Course {
    return this.editingCourse;
  }
}
