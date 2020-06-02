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
    Username: 'Wark',
    PhoneNumber: '645770421',
    Email: 'jabyherjor@gmail.com',
    DeviceId: 0,
    Password: '**********',
    PhotoDirectory: 'https://media-exp1.licdn.com/dms/image/C5603AQH_sTjzMZ-9lQ/profile-displayphoto-shrink_200_200/0?e=1596672000&v=beta&t=GRVOeUitTGqCviGW3SysPCOd88jPDYqj_PExNINXNOI',
    UserId: 0
  };

  constructor() { }

  ngOnInit() { }

}
