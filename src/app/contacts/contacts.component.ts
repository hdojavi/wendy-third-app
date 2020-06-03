import { Component, OnInit } from '@angular/core';
import { ApiWendyService } from '../services/api-wendy.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactsEmpty = true;
  contacts: any;

  constructor(private api: ApiWendyService) { }

  ngOnInit() {
    this.api.getContacts(0/*userId*/).subscribe(contacts => {
      this.contacts = contacts;
      if (this.contacts.length > 0) {
        this.contactsEmpty = false;
      }
    });
  }

  openDetailContact(contact?) {
    console.log(contact);
  }

  editContact(contact: any) {
    this.api.editContact(contact);
  }

  removeContact(idContact: number) {
    this.api.removeContact(idContact);
  }

  addContact(contact: any) {
    this.api.addContact(contact);
  }

}
