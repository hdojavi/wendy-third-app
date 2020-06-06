import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactsEmpty = true;
  contacts: any;

  constructor() { }

  ngOnInit() {

  }

  openDetailContact(contact?) {
    console.log(contact);
  }

  editContact(contact: any) {
  }

  removeContact(idContact: number) {
  }

  addContact(contact: any) {
  }

}
