import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './Services/userService/user.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnDestroy {
  title = 'virtual-academy';
  hasLoggedUser: boolean;
  isAdmin: boolean;

  destroy$ = new Subject<boolean>();

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  ngOnInit() {
    this.setIsAdmin();
    this.setHasLoggdeIn();
  }

  private setHasLoggdeIn(): void {
    this.userService.getHasLoggedIn().pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => this.hasLoggedUser = response);
  }

  private setIsAdmin(): void {
    this.userService.getIsAdmin().pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => this.isAdmin = response);
  }
  
  onLogout(): void {
    this.hasLoggedUser=false;
    this.isAdmin=false;

    this.userService.logout();
    this.router.navigateByUrl('/home');

    
  }
}
