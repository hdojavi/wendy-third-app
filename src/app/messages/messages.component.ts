import { Component, OnInit, ViewChild } from '@angular/core';
import { Email } from '../models/Email';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  user: User;

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.emails.paginator = value;
  }
  columnsEmails = ['image', 'contact', 'subject', 'body', 'detail'];
  emails = new MatTableDataSource();
  messages: any = [];

  constructor(private auth: AuthService, private messagesService: MessagesService) { }

  ngOnInit() {
    this.user = this.auth.getUserLoggedValue();

    this.messagesService.getEmails(this.user.deviceId).subscribe(emails => {
      this.emails = new MatTableDataSource(emails);
    });
  }

  openAllMessages() {

  }

  detailMessage(email) {
    console.log(email);
  }
}
