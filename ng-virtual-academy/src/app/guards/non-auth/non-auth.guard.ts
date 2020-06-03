import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Services/userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
    constructor(private userService: UserService,
                private router: Router) {
}

canActivate(): boolean {
    const user = this.userService.getLoggedUser();

    if (user) {
      this.router.navigate(['home']);

      return false;
    }

    return true;
    } 
}
