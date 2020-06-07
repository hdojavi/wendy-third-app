import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private URL_BASE_CONTACTS = `${Constants.BACKEND_IP}/wendy/contacts`;

  constructor(private http: HttpClient) { }

  getContacts(deviceId) {
    return this.http.get<Contact[]>(`${this.URL_BASE_CONTACTS}/${deviceId}`);
  }

  addContact(contact: Contact) {
    return this.http.post<Contact>(`${this.URL_BASE_CONTACTS}`, contact);
  }

  editContact(contact: Contact) {
    return this.http.put<Contact>(`${this.URL_BASE_CONTACTS}`, contact);
  }

  deleteContact(contactId) {
    return this.http.delete(`${this.URL_BASE_CONTACTS}/${contactId}`);
  }
}
