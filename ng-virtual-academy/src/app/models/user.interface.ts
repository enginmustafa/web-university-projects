import { Course } from './course.interface';

export interface User {
    id?: number;
    fName: string;
    lName: string;
    email: string;
    password: string;
    blocked: boolean;
    administrator: boolean;
    favoriteCourses: Course[]
  }