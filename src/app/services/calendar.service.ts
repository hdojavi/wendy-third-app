import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/Event';
import { EventType } from '../models/EventType';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private URL_BASE_EVENTS = `${Constants.BACKEND_IP}/wendy/events`;
  constructor(private http: HttpClient) { }

  getEvents(deviceId: number): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.URL_BASE_EVENTS}/${deviceId}`);
  }

  getEventTypes(deviceId: number): Observable<EventType[]>{
    return this.http.get<EventType[]>(`${this.URL_BASE_EVENTS}/eventTypes/${deviceId}`);
  }

  createEvent(event: Event): Observable<Event>{
    return this.http.post<Event>(`${this.URL_BASE_EVENTS}`, event);
  }

  createEventType(eventType: EventType): Observable<EventType>{
    return this.http.post<EventType>(`${this.URL_BASE_EVENTS}/eventTypes`, eventType);
  }

  updateEvent(event: Event): Observable<Event>{
    return this.http.put<Event>(`${this.URL_BASE_EVENTS}`, event);
  }

  updateEventType(eventType: EventType): Observable<EventType>{
    return this.http.put<EventType>(`${this.URL_BASE_EVENTS}/eventTypes/`, eventType);
  }

  deleteEvent(eventId: number) {
    return this.http.delete(`${this.URL_BASE_EVENTS}/${eventId}`);
  }

  deleteEventType(eventTypeId: number) {
    return this.http.delete(`${this.URL_BASE_EVENTS}/eventTypes/${eventTypeId}`);
  }

  // updateCommand(command: Command) {
  //   return this.http.put<Command>(`${this.URL_BASE_COMMANDS}`, command);
  // }
}
