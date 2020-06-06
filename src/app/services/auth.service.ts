import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLoggedSubject: BehaviorSubject<User>
  private URL_AUTH = `${Constants.BACKEND_IP}/wendy/users/auth`;
  public userLogged: Observable<User>;

  constructor(private http: HttpClient) {
    this.userLoggedSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userLogged')));
    this.userLogged = this.userLoggedSubject.asObservable();
  }

  public getUserLoggedValue(): User {
    return this.userLoggedSubject.value;
  }

  public setUserLoggedSubject(user: User) {
    this.userLoggedSubject.next(user);
  }
  login(user: User) {
    return this.http.post(this.URL_AUTH, user)
      .pipe(map((user: User) => {
        if (user) {
          localStorage.setItem('userLogged', JSON.stringify(user));
          this.userLoggedSubject.next(user);
          return user;
        }
      }));
  }

  logout() {
    localStorage.removeItem('userLogged');
    this.userLoggedSubject.next(null);
  }
}
