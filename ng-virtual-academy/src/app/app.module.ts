import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses-table/courses.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserManageComponent } from './users/users-manage/user-manage.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { NewCourseComponent } from './courses/new-course/new-course.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CoursesComponent,
    UserEditComponent,
    UserManageComponent,
    EditCourseComponent,
    NewCourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
