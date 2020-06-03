import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { takeUntil, map } from 'rxjs/operators';
import { ValidatorUtil } from 'src/app/util/validator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/userService/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css', '../../style.css']
})
export class UserEditComponent implements OnInit {

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

    //check for any field errors
    if (!validator.isValid()) {      
      this.errorMessage = validator.getError();

    }
    else {
          // if fields aren't empty ->check for password mismatch, else, pass
        if (formData.password !== formData.rePassword) {
          this.errorMessage = 'Passwords do not match.';
          return;
        }
          let editedUser = this.updateProperties(this.form.value);

          //if null, no changes made
          if(editedUser) {
              this.userService.edit(this.updateProperties(editedUser)).pipe(
                takeUntil(this.destroy$)
              ).subscribe(response => {
                  this.userService.setLoggedUser(editedUser);
                  this.reloadForm();
                  alert('Your profile has been updated!')
              });
          }
          ////if no changes made, dont send request
          //else 
          //  alert('same credentials')
      }
  }

  private updateProperties(formUser: User): User {
    let hasChanges: Boolean;
    let user: User;

    user = this.userService.getLoggedUser();

    if(user.fName != formUser.fName){
      user.fName = formUser.fName;
      hasChanges=true;
    }

    if(user.lName != formUser.lName) {
      user.lName=formUser.lName;
      hasChanges=true;
    }

    if(formUser.password && (user.password != formUser.password)) {
      user.password=formUser.password;
      hasChanges=true;
    }
    
    if(!hasChanges)
      user = null;

    return user;
}
  
  private buildForm(): void {
    let loggedUser: User;
    loggedUser = this.userService.getLoggedUser();

    this.form = this.fb.group({
      fName: [loggedUser.fName, Validators.required],
      lName: [loggedUser.lName, Validators.required],
      email: [loggedUser.email, [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(5), Validators.maxLength(20)]],
      rePassword: ['', [Validators.minLength(5), Validators.maxLength(20)]]
    });
  }

  private reloadForm(): void{
    let freshUser: User;
    freshUser = this.userService.getLoggedUser();

    this.form.reset({
      fName: freshUser.fName,
      lName: freshUser.lName,
      email: freshUser.email,
      password: '',
      rePassword: ''
    });
  }
}
