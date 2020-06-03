import { Course } from './course.interface';

export interface UserCourse {
    course: Course;
    isFavorite: boolean;
    userRating: number;
  }