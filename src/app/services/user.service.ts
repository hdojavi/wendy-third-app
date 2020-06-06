import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL_USER_BASE: string = `${Constants.BACKEND_IP}/wendy/users`

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.URL_USER_BASE, user);
  }
}
