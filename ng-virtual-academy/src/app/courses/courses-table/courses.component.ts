import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/Services/courseService/course.service';
import { Subject } from 'rxjs';
import { Course } from '../../models/course.interface';
import { takeUntil, map } from 'rxjs/operators';
import { UserService } from 'src/app/Services/userService/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { UserCourse } from 'src/app/models/userCourse.interface';
import { UserRating } from 'src/app/models/userRating.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css','../../style.css']
})
export class CoursesComponent implements OnInit {
  courses: UserCourse[] = [];
  userFavoriteCourses: Course[];
  isUserAdmin: boolean;

  //wait asynchronous call
  inProcess: boolean;

  destroy$ = new Subject<boolean>();

  constructor(private courseService: CourseService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadUser();
    this.loadCourses();
  }

  private calculateRatings(): void {
    this.courses.forEach(userCourse => {
      this.calculateRating(userCourse.course);
    });
  }

  private calculateRating(course: Course): void {
    let rating: number;
    let ratingCount: number;

    this.courseService.getCourse(course).pipe(
      takeUntil(this.destroy$)
    ).subscribe(dbCourse => {
      
      if (dbCourse) {
        rating = 0;
        ratingCount = dbCourse.userRatings.length;

        if(ratingCount > 0) {
          dbCourse.userRatings.forEach(userRating => {
            if(userRating.rating != 0){
              rating += parseFloat(userRating.rating.toString());
            }
            else{              
              ratingCount--;
            }
          });
          rating = rating / ratingCount;

          if(rating != dbCourse.rating) {
            dbCourse.rating = rating;
            course.rating = rating;

            this.courseService.edit(dbCourse);
          }
        }
      }
    });
  }

  private loadUser() {
    if(this.userService.getAdminUser())
      this.isUserAdmin=true;      
  }

  private loadCourses() {

    this.courses = [];

    //clear editing course - > on load & after back button pressed from edit page
    this.courseService.setEditingCourse(null);

    this.courseService.getCourses().subscribe(courses =>
      courses.forEach(course => {
        let userCourse = <UserCourse>{
          "course": course,
          "isFavorite": false
        };
        this.courses.push(userCourse);
      }),
        err => {
        console.log(err);
      },
      () => {  
        this.userFavoriteCourses = this.userService.getLoggedUser().favoriteCourses;

        this.userFavoriteCourses.forEach(userCourse => {
          this.courses.forEach(course => {
            if(course.course.id==userCourse.id) {
              course.isFavorite=true;
            }
          });
        });

        this.calculateRatings();
        this.getUserRatings();
      });

  }

  getUserRatings(): void {
    let currentUser = this.userService.getLoggedUser();

    this.courses.forEach(userCourse => {
      userCourse.course.userRatings.forEach(userRating => {
        if(userRating.userId==currentUser.id) {
          userCourse.userRating = userRating.rating;
        }
      });
    });
  }

  onCreate(course:Course):void {
      //create new
      this.courseService.createCourse(course).pipe(
        takeUntil(this.destroy$)
      ).subscribe(response => {
          alert('Course is created!')

          //prevent reloading of whole list on each operation
          this.addCourseToList(response);
      });
  }

  onDelete(course: Course): void {

      //delete
      this.courseService.delete(course).pipe(
        takeUntil(this.destroy$)
      ).subscribe(response => {
          //prevent reloading of whole list on each operation
          this.removeCourseFromList(course);

          //remove course from user favorites
          this.removeCourseFromUserFavorites(course);
      });
  }


  private removeCourseFromUserFavorites(course: Course): void {
  this.userService.getUsers().subscribe(users => {
    users.forEach(user => {
      if(user.favoriteCourses) {
        user.favoriteCourses.forEach(favoriteCourse => {
          if(favoriteCourse.id==course.id) {
              let courseIndex = user.favoriteCourses.indexOf(favoriteCourse);
              
              user.favoriteCourses.splice(courseIndex,1);

              this.userService.edit(user).pipe(
                takeUntil(this.destroy$)
              ).subscribe(response => {
                //user's favorite course removed
              });
          }
        });
      }
    });    
  });
}

  onEdit(course: Course): void {
    this.courseService.setEditingCourse(course);

    this.router.navigate(['courses-edit']);
  }

  onFavorite(course: Course):void {
    let user = this.userService.getLoggedUser();
    let isFavorite: boolean;
    
    if(user.favoriteCourses){
      user.favoriteCourses.forEach(userCourse => {
        if(userCourse.id == course.id)
          isFavorite = true;
      });
    }

    //course is favorite
    if(isFavorite) {
      this.removeFavorite(course, user);
    }
    //add courses to favorites
    else {
      this.addFavorite(course, user) 
    } 

    //reset session user
    this.userService.setLoggedUser(user);

    //change isFavorite locally to prevent loading of whole list on each click
    this.changeLocalFavorite(course);
  }

  onRate(course: Course, rating: number) {
    let userRating = <UserRating> {
      "userId": this.userService.getLoggedUser().id,
      "rating": rating
    }

    this.courses.forEach(userCourse => {
      let hasVoted: boolean;
      let sameRating: boolean;

      hasVoted= sameRating = false;

      if(userCourse.course.id==course.id){

        //check if user has already voted
        userCourse.course.userRatings.forEach(courseRating => {
          if(courseRating.userId==userRating.userId){
            if(courseRating.rating==userRating.rating)
              sameRating=true;
            else
              courseRating.rating=rating;

            hasVoted=true;
          }
        });

        if(!hasVoted) {
          userCourse.course.userRatings.push(userRating);
        }

        if(!sameRating) {
          //set local rating for current user
          userCourse.userRating=rating;

          //update user rating in db
          this.courseService.edit(userCourse.course).pipe(
            takeUntil(this.destroy$)
          ).subscribe(response => {
              this.calculateRating(userCourse.course)
          });
      }
      }
    });
  }

  private addFavorite(course:Course, user: User): boolean {
    user.favoriteCourses.push(course);

    this.userService.edit(user).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      if(response)
        return true;
    });

    return false;
  } 

  private removeFavorite(course:Course, user: User): boolean {
    let courseIndex;

    user.favoriteCourses.forEach(userCourse => {
      if(userCourse.id == course.id) {
        courseIndex = user.favoriteCourses.indexOf(userCourse)
      }
    });

    user.favoriteCourses.splice(courseIndex,1);

    this.userService.edit(user).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
        if(response)
          return true;
    });
    
    return true;
  }

  private changeLocalFavorite(course:Course) {
    this.courses.forEach(userCourse => {
      if(userCourse.course.id==course.id) {
        userCourse.isFavorite = userCourse.isFavorite ? false : true
      }
    });
  }

  private removeCourseFromList(course : Course): void {
    let deleteCourse: UserCourse;
    let courseIndex;

    this.courses.forEach(userCourse => {
      if(userCourse.course.id == course.id)
        deleteCourse = userCourse;
    });

    this.courses.indexOf(deleteCourse);
    this.courses.splice(courseIndex,1);
  }

  private addCourseToList(course : Course): void{
    let userCourse: UserCourse;

    userCourse.course = course;
    userCourse.isFavorite = false;

    this.courses.push(userCourse);
  }
}
