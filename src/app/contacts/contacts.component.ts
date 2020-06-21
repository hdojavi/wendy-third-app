import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from '../services/contacts.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
import { Contact } from '../models/Contact';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  columnsToDisplay = ['name', 'email', 'phoneNumber', 'actions'];
  titleDetail: string;
  detailIsVisible = false;
  formIsEdit: boolean;

  form: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
  });

  user: User;
  contactsEmpty = true;
  dataSource = new MatTableDataSource<Contact>();
  contacts: Contact[];

  constructor(private auth: AuthService, private contactsService: ContactsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.auth.getUserLoggedValue();

    this.contactsService.getContacts(this.user.deviceId).subscribe(contacts => {
      if (Array.isArray(contacts) && contacts.length) {
        this.contacts = contacts;
        this.dataSource = new MatTableDataSource(contacts);
        this.contactsEmpty = false;
      }
    });
  }

  removeContact(contactId: number) {
    this.contactsService.deleteContact(contactId).subscribe(c => {
      this.contacts = this.contacts.filter(contact => contact.contactId !== contactId);
      this.dataSource = new MatTableDataSource(this.contacts);
    }, e => console.error(e));
  }

  onSubmit() {
    let temporalContact = new Contact();
    temporalContact.email = this.form.value.email;
    temporalContact.name = this.form.value.name;
    temporalContact.lastName = this.form.value.lastName;
    temporalContact.phoneNumber = this.form.value.phoneNumber;
    temporalContact.deviceId = this.user.deviceId;

    if (this.formIsEdit) {
      temporalContact.contactId = this.form.value.id;

      this.contactsService.editContact(temporalContact).subscribe(c => {
        const contactIndex = this.contacts.findIndex(i => i.contactId == temporalContact.contactId);
        this.contacts[contactIndex] = c;
        this.dataSource = new MatTableDataSource(this.contacts);
      }, e => console.error(e),
        () => this.closeDetail());
    } else {
      this.contactsService.addContact(temporalContact).subscribe(c => {
        this.contacts.push(c);
        this.dataSource = new MatTableDataSource(this.contacts);
      }, e => console.error(e),
        () => this.closeDetail());
    }
  }

  openDetailContact(contactId?) {
    this.form.reset();
    this.detailIsVisible = true;

    if (contactId) {
      this.titleDetail = 'Editar';
      this.formIsEdit = true;
      const contact = this.contacts.filter(c => c.contactId == contactId)[0];
      this.form.controls.name.setValue(contact.name);
      this.form.controls.lastName.setValue(contact.lastName);
      this.form.controls.email.setValue(contact.email);
      this.form.controls.phoneNumber.setValue(contact.phoneNumber);
      this.form.controls.id.setValue(contact.contactId);

    } else {
      this.titleDetail = 'Añadir';
      this.formIsEdit = false;
    }
  }

  closeDetail() {
    this.form.reset();
    this.detailIsVisible = false;
  }

}
