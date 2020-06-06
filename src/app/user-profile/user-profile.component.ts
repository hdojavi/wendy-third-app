import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Observable, from } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUserLoggedValue();
  }

}
