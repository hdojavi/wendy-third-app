import { Component, OnInit, ViewChild } from '@angular/core';
import { Email } from '../models/Email';
import { User } from '../models/User';
import { Message } from '../models/Message';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { MessageService } from '@progress/kendo-angular-l10n';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  user: User;
  messageToSend: string = '';
  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.emails.paginator = value;
  }
  columnsEmails = ['image', 'contact', 'subject', 'body', 'detail'];
  emails = new MatTableDataSource();
  messages: Message[] = [];

  constructor(private auth: AuthService, private messagesService: MessagesService) { }

  ngOnInit() {
    this.user = this.auth.getUserLoggedValue();

    this.messagesService.getMessages(this.user.deviceId).subscribe(messages => this.messages = messages);
    this.messagesService.getEmails(this.user.deviceId).subscribe(emails => {
      this.emails = new MatTableDataSource(emails);
    });
  }

  detailMessage(email) {
    console.log(email);
  }

  getFormattedTime(date) {
    return moment(new Date(date)).format('DD/MM/YYYY HH:mm');
  }

  sendMessage() {
    console.log(this.messageToSend);
    if (this.messageToSend === '') return;

    let message = new Message();
    message.content = this.messageToSend;
    message.isFromDevice = false;
    message.userId = this.user.userId;
    message.deviceId = this.user.deviceId;
    message.date = new Date();

    this.messagesService.sendMessage(message).subscribe(message => {
      this.messages.push(message);
      this.messageToSend = '';
    });
  }

}
