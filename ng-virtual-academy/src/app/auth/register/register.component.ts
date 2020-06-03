
import {Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {User} from '../../models/user.interface';
import {Router} from '@angular/router';
import { UserService } from 'src/app/Services/userService/user.service';
import {  ValidatorUtil } from 'src/app/util/validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../style.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    this.errorMessage=null;
    const formData = this.form.value;
    
    let validator: ValidatorUtil = new ValidatorUtil(this.form);
    console.log(!validator.isValid());

    //check for any field errors
    if (!validator.isValid()) {      
      this.errorMessage = validator.getError();

    }
    else {
          // check for password mismatch
        if (formData.password !== formData.rePassword) {
          this.errorMessage = 'Passwords do not match.';

          this.form.reset({
            fName: formData.fName,
            lName: formData.lName,
            email: formData.email,
            password: '',
            rePassword: ''
          });

          return;
        }

        // getAllUsers -> check if email exists
        this.userService.getUsers().pipe(
          map((response: User[]) => response.find(user => user.email === formData.email)),
          takeUntil(this.destroy$)
        ).subscribe(userResponse => {
          if (userResponse) {
            this.errorMessage = 'Email is already taken.';

            return;
          }

          this.userService.register(this.defineNewUser(this.form.value)).pipe(
            takeUntil(this.destroy$)
          ).subscribe(response => {
            alert('Successfully registered. Use your credentials to log in!')
            this.router.navigate(['login']);
          });
        });
      }
  }

  private defineNewUser(formUser: User): User {
    
    let user = <User> {
      "email":formUser.email,
      "fName":formUser.fName,
      "lName":formUser.lName,
      "password":formUser.password,
      "administrator":false,
      "blocked":false,
      "favoriteCourses": []
    }
    
    return user;
}
  
  private buildForm(): void {
    this.form = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      rePassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    });
  }
}
