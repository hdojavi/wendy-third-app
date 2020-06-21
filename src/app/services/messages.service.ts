import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import { HttpClient } from '@angular/common/http';
import { Email } from '../models/Email';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private URL_BASE_EMAILS = `${Constants.BACKEND_IP}/wendy/Emails`;
  private URL_BASE_MESSAGES = `${Constants.BACKEND_IP}/wendy/Messages`;

  constructor(private http: HttpClient) { }

  getEmails(deviceId) {
    return this.http.get<Email[]>(`${this.URL_BASE_EMAILS}/${deviceId}`);
  }


  getMessages(deviceId) {
    return this.http.get<Message[]>(`${this.URL_BASE_MESSAGES}/${deviceId}`);
  }

  sendMessage(message: Message) {
    return this.http.post<Message>(`${this.URL_BASE_MESSAGES}`, message);
  }
}
