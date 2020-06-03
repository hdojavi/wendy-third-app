import { Component, OnInit } from '@angular/core';
import { ApiWendyService } from '../services/api-wendy.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  emails: any;
  emailsEmpty = true;
  messages: any;
  messagesEmpty = true;

  constructor(private api: ApiWendyService) { }

  ngOnInit() {

    this.api.getMessages(0/*userID*/).subscribe(messages => {
      this.messages = messages;
      if (this.messages.length > 0) {
        this.messagesEmpty = false;
      }
    });

    this.api.getEmails(0/*userID*/).subscribe(emails => {
      this.emails = emails;
      if (this.emails.length > 0) {
        this.emailsEmpty = false;
      }
    });

  }

  openAllMessages() {

  }

  openAllEmails() {

  }
}
