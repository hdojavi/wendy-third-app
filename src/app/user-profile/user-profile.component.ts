import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = {
    username: 'Wark',
    phoneNumber: '645770421',
    email: 'jabyherjor@gmail.com',
    deviceId: 0,
    password: '**********',
    photoDirectory: 'https://media-exp1.licdn.com/dms/image/C5603AQH_sTjzMZ-9lQ/profile-displayphoto-shrink_200_200/0?e=1596672000&v=beta&t=GRVOeUitTGqCviGW3SysPCOd88jPDYqj_PExNINXNOI',
    userId: 0
  };

  constructor() { }

  ngOnInit() { }

}
