import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {

  }

  openAllMessages() {

  }

  openAllEmails() {

  }
}
