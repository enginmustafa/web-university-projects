import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/Services/userService/user.service';
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CourseService } from 'src/app/Services/courseService/course.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css', '../../style.css']
})
export class UserManageComponent implements OnInit {
  users: User[];

  destroy$ = new Subject<boolean>();

  constructor(private userService: UserService,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  onBlock(user: User): void {
    if(!user.administrator) {
      //set as blocked
      user.blocked=true;

      //update
      this.userService.edit(user).pipe(
        takeUntil(this.destroy$)
      ).subscribe(response => {
          alert('User is blocked!')
      });
    }
    else
      alert('Privileged users can not be blocked.')
  }

  onDelete(user: User): void {
    if(!user.administrator) {

      //delete
      this.userService.delete(user).pipe(
        takeUntil(this.destroy$)
      ).subscribe(response => {
          alert('User is deleted!')

          //prevent reloading of whole list on each operation
          this.removeUserFromList(user);

          //remove user rating from courses
          this.removeUserRatings(user);
      });
    }
    else
      alert('Privileged users can not be deleted.')
  }

  private removeUserRatings(user: User): void {
      this.courseService.getCourses().subscribe(courses => {
        courses.forEach(course => {
          if(course.userRatings) {
            course.userRatings.forEach(userRating => {
              if(userRating.userId==user.id) {
                  let userRatingIndex = course.userRatings.indexOf(userRating);
                  
                  course.userRatings.splice(userRatingIndex,1);
    
                  this.courseService.edit(course).pipe(
                    takeUntil(this.destroy$)
                  ).subscribe(response => {
                    //user ratings removed from course
                  });
              }
            });
          }
        });    
      });
  }

  private removeUserFromList(user): void {
    let userIndex = this.users.indexOf(user)

    this.users.splice(userIndex,1);
  }

}
