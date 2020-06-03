import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Services/userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class PrivilegedGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {}
  
      
  canActivate(): boolean {
    const admin = this.userService.getAdminUser();

    if (!admin) {
      //dont route to nowhere, stay on same page

      return false;
    }

    return true;
    } 
  
}

