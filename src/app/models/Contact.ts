import { Device } from './Device';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export class Contact {
    contactId: number;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    photoDirectory: string;
    deviceId: number;
    device: Device;
    messages: Message[];
    // emailsReceived: Email[];
}
