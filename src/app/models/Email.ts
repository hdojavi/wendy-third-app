import { Device } from './Device';
import { Contact } from './Contact';
export interface Email {
    emailId: number;
    subject: string;
    body: string;
    date: string;
    deviceId: number;
    contactId: number;
    device: Device;
    contact: Contact;
}