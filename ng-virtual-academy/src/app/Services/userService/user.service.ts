import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url = 'http://localhost:3000/users';
  readonly loggedUserStorageKey = 'loggedUser';

  private hasLoggedIn$ = new BehaviorSubject<boolean>(false);
  private isAdmin$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  login(email: string, password: string): Observable<User> {
    return this.getUsers().pipe(
      map((response: User[]) => response.find(user => user.email === email && user.password === password))
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  edit(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  delete(user: User): Observable<User> {
    return this.http.delete<User>(`${this.url}/${user.id}`);
  }

  logout(): void {
    localStorage.removeItem(this.loggedUserStorageKey);
  }

  //check if user is blocked before letting him in
  setLoggedUser(user: User): boolean {
    if(!user.blocked){
      localStorage.setItem(this.loggedUserStorageKey, JSON.stringify(user));

      this.setHasLoggedIn(true);

      if(user.administrator) 
        this.setIsAdmin(true);

      return true;
    }
    else {
      return false;
    }
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem(this.loggedUserStorageKey));
  }

  setHasLoggedIn(isLogged: boolean): void {
    this.hasLoggedIn$.next(isLogged);
  }

  getHasLoggedIn(): Observable<boolean> {
    return this.hasLoggedIn$.asObservable();
  }

  setIsAdmin(isAdmin: boolean): void {
    this.isAdmin$.next(isAdmin);
  }

  getIsAdmin(): Observable<boolean>{
    return this.isAdmin$.asObservable();
  }

  getAdminUser(): User {
    let user: User;
    user = JSON.parse(localStorage.getItem(this.loggedUserStorageKey));

    if(user.administrator) 
      return user;

    return null;
  }
}
