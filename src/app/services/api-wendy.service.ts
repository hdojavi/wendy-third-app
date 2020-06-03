import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class ApiWendyService {

  apiBase = Constants.API_BASE_URL;

  constructor(private http: HttpClient) { }

  /**
   * Messages
   */
  getMessages(userId) {
    const params = new HttpParams()
      .set('userId', userId);

    return this.http.get(`${this.apiBase}/third-app/GetMessages`, { params });
  }

  /**
   * Emails
   */
  getEmails(userId) {
    const params = new HttpParams()
      .set('userId', userId);

    return this.http.get(`${this.apiBase}/third-app/GetEmails`, { params });
  }

  /**
   * User
   */
  login(userName: string, password: string) {

  }

  /**
   * Contacts
   */
  getContacts(userId) {
    const params = new HttpParams()
      .set('userId', userId);

    return this.http.get(`${this.apiBase}/third-app/GetContacts`, { params });
  }

  editContact(contact: any) {

    this.http.post(`${this.apiBase}/third-app/EditContact`, { contact });
  }

  removeContact(contactId) {
    const params = new HttpParams()
      .set('contactId', contactId);

    this.http.post(`${this.apiBase}/third-app/RemoveContact`, { params });
  }

  addContact(contact: any) {

    this.http.post(`${this.apiBase}/third-app/AddContact`, { contact });
  }

  /**
   * Commands
   */
  getCommands(userId) {
    const params = new HttpParams()
      .set('userId', userId);

    return this.http.get(`${this.apiBase}/third-app/GetCommands`, { params });
  }
}
