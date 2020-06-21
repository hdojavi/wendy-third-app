import { Device } from './Device';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { EventType } from './EventType';

export class Event {
    eventId: number;
    description: string;
    date: Date;
    isSerie: boolean;
    isTimeRelevant: boolean;
    deviceId: number;
    eventTypeId: number;
    eventType: EventType
}
