import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses-table/courses.component';
import { NonAuthGuard } from './guards/non-auth/non-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { PrivilegedGuard } from './guards/admin/privileged.guard';
import { UserManageComponent } from './users/users-manage/user-manage.component';
import { NewCourseComponent } from './courses/new-course/new-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { EditingCourseGuard } from './guards/editing-course/editing-course.guard';


const routes: Routes = [
  {
     path: 'login', 
     component: LoginComponent,
     canActivate: [NonAuthGuard]

  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [NonAuthGuard]
  },
  { 
    path: 'home', 
    component: HomeComponent 
  },
  { 
    path: 'courses', 
    component: CoursesComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'courses-add', 
    component: NewCourseComponent,
    canActivate: [PrivilegedGuard]
  },
  { 
    path: 'courses-edit', 
    component: EditCourseComponent,
    canActivate: [PrivilegedGuard, EditingCourseGuard]
  },
  { 
    path: 'profile', 
    component: UserEditComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'users-manage', 
    component: UserManageComponent,
    canActivate: [PrivilegedGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
