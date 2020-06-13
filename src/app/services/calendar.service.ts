import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private URL_BASE_EVENTS = `${Constants.BACKEND_IP}/wendy/events`;
  constructor(private http: HttpClient) { }

  getEvents(deviceId: number): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.URL_BASE_EVENTS}/${deviceId}`);
  }

  createEvent(event: Event): Observable<Event>{
    return this.http.post<Event>(`${this.URL_BASE_EVENTS}`, event);
  }

  updateEvent(event: Event): Observable<Event>{
    return this.http.put<Event>(`${this.URL_BASE_EVENTS}`, event);
  }

  deleteEvent(eventId: number) {
    return this.http.delete(`${this.URL_BASE_EVENTS}/${eventId}`);
  }
  // updateCommand(command: Command) {
  //   return this.http.put<Command>(`${this.URL_BASE_COMMANDS}`, command);
  // }
}
