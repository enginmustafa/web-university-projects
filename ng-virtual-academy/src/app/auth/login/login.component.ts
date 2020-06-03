import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../Services/userService/user.service';
import { ValidatorUtil } from 'src/app/util/validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../style.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  errorMessage: string;

  destroy$ = new Subject<boolean>();
  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {
    this.errorMessage = null;

    let validator: ValidatorUtil = new ValidatorUtil(this.form);

    //check for any field errors
    if (!validator.isValid()) {      
      this.errorMessage = validator.getError();
    }
    else {
        const email = this.form.controls.email.value;
        const password = this.form.controls.password.value;

        this.userService.login(email, password).pipe(
          takeUntil(this.destroy$)
        ).subscribe(response => {
          if (!response) {
            this.errorMessage = 'Invalid email or password.';

            return;
          }

          // store logged user, if false - > user is blocked, don't do anything
          if(this.userService.setLoggedUser(response)) {
            //redirect to courses
            this.router.navigate(['/courses']);
          }
          else {
            this.errorMessage = 'Your account has been blocked.'
          }
        });
      }
 }
 buildForm() {
  this.form = this.fb.group({
    email: ['', [Validators.required,Validators.email]],

    //dont validate password length, due to change policy some users could have been left with old passwords
    password: ['', Validators.required]
  })
 }
}
