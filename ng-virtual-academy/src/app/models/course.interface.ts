import { UserRating } from './userRating.interface';

export interface Course {
    id?: number;
    title: string;
    description: string;
    date: string;
    rating: number;
    userRatings: UserRating[]
  }