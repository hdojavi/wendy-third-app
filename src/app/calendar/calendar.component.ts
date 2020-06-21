import { Component, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, } from 'date-fns';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, DAYS_OF_WEEK, CalendarDateFormatter, } from 'angular-calendar';
import { Subject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { CalendarService } from '../services/calendar.service';
import { Event } from '../models/Event';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';
import { EventType } from '../models/EventType';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]
})


export class CalendarComponent implements OnInit {


  // Database
  eventsRaw: Event[];
  eventsTypeRaw: EventType[];



  // Calendar configuration
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  eventDay: EventDay = new EventDay();
  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  locale: string = 'es';
  events: CalendarEvent[] = [];

  // Data grid create type event
  public gridDataCreateEventType: EventType[];
  public gridStateEventType: State = {
    sort: [],
    skip: 0,
    take: 10
  };

  // Data grid create event
  public gridData: EventBack[];
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public viewGrid: Observable<GridDataResult>;
  private editedRowIndex: number;
  private editedEvent: EventBack;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private calendarService: CalendarService, private authService: AuthService) {
    this.calendarService.getEvents(this.authService.getUserLoggedValue().deviceId)
      .subscribe(ev => {
        this.eventsRaw = ev;
        let events: CalendarEvent[] = [];
        this.eventsRaw.forEach(evRaw => {
          events.push(this.getCalendarEventFromEventRaw(evRaw));
        });
        this.events = events;
      });

    this.calendarService.getEventTypes(this.authService.getUserLoggedValue().deviceId)
      .subscribe(et => {
        this.eventsTypeRaw = et;
        this.gridDataCreateEventType = et;
      })
  }

  ngOnInit() {
  }


  openCreateType(contentEventType) {
    this.modalService.open(contentEventType, { size: 'lg' }).result.then((result) => {
    }, (reason) => {
    });
  }

  // Calendar methods
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }, content): void {
    let eventsMapped: EventBack[] = [];
    events.forEach(e => {
      let em = new EventBack();
      em.eventId = <number>e.id;
      em.description = e.title;
      em.time = e.start;
      eventsMapped.push(em);
    });

    this.gridData = eventsMapped;
    let eventDay = new EventDay();
    eventDay.day = date;
    eventDay.events = events;

    this.eventDay = eventDay;

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {
    });
  }


  handleEvent(action: string, event: CalendarEvent): void {
    console.log('uwu');
  }

  setView(view: CalendarView) {
    this.view = view;
  }


  getFormattedEventDay(date: Date) {
    return `${date.getDate()} de ${date.toLocaleString('es', { month: 'long' })} de ${date.getFullYear()}`;
  }
  // Data grid create event methods
  public onStateChange(state: State) {
    this.gridState = state;
  }

  public addHandler({ sender }, formInstance) {
    formInstance.reset();
    this.closeEditor(sender);

    sender.addRow(new EventBack());
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.editedRowIndex = rowIndex;
    // this.editedProduct = Object.assign({}, dataItem);

    sender.editRow(rowIndex);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, dataItem, isNew }) {
    let ev = new Event();
    debugger;
    if (isNew) {
      let dAux = this.eventDay.day;

      ev.deviceId = this.authService.getUserLoggedValue().deviceId;
      ev.description = dataItem.description;
      ev.eventTypeId = dataItem.eventTypeId.eventTypeId;
      ev.isTimeRelevant = dataItem.time !== undefined;

      dAux.setHours(dataItem.time.getHours());
      dAux.setMinutes(dataItem.time.getMinutes());
      ev.date = this.eventDay.day;
      ev.isSerie = false;

      this.calendarService.createEvent(ev)
        .subscribe(evCreated => {
          this.events.push(this.getCalendarEventFromEventRaw(evCreated));
          this.gridData.push(this.getCalendarEvBackFromEventRaw(evCreated));
          this.refresh.next();
        });
    } else {
      let dAux = this.eventDay.day;
      ev.eventId = dataItem.eventId;
      ev.eventTypeId = dataItem.eventTypeId.eventTypeId;
      ev.deviceId = this.authService.getUserLoggedValue().deviceId;
      ev.description = dataItem.description;
      ev.isTimeRelevant = dataItem.time !== undefined;

      dAux.setHours(dataItem.time.getHours());
      dAux.setMinutes(dataItem.time.getMinutes());
      ev.date = this.eventDay.day;
      ev.isSerie = false;

      this.calendarService.updateEvent(ev)
        .subscribe(evUpdated => {
          let indexEvents = this.events.findIndex(x => x.id === evUpdated.eventId);
          let indexGridData = this.gridData.findIndex(x => x.eventId === evUpdated.eventId);

          this.events[indexEvents] = this.getCalendarEventFromEventRaw(evUpdated);
          this.gridData[indexGridData] = this.getCalendarEvBackFromEventRaw(evUpdated);

          this.refresh.next();
        });
    }

    sender.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    // this.editedProduct = undefined;
  }

  public removeHandler({ dataItem }) {
    this.calendarService.deleteEvent(dataItem.eventId)
      .subscribe(() => {
        this.gridData = this.gridData.filter(e => {
          return e.eventId != dataItem.eventId;
        });

        this.events = this.events.filter(e => {
          return e.id != dataItem.eventId;
        });
      });
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    // this.editService.resetItem(this.editedProduct);
    // this.editedRowIndex = undefined;
    // this.editedProduct = undefined;
  }


  // Data grid create event methods
  public onStateChangeEventType(state: State) {
    this.gridState = state;
  }

  public saveHandlerEventType({ sender, rowIndex, dataItem, isNew }) {
    let evt = new EventType();
    if (isNew) {

      evt.deviceId = this.authService.getUserLoggedValue().deviceId;
      evt.title = dataItem.title;
      evt.color = dataItem.color;

      this.calendarService.createEventType(evt)
        .subscribe(evtCreated => {
          this.gridDataCreateEventType.push(evtCreated);
        });
    } else {
      debugger;
      evt.eventTypeId = dataItem.eventTypeId;
      evt.deviceId = this.authService.getUserLoggedValue().deviceId;
      evt.title = dataItem.title;
      evt.color = dataItem.color;

      this.calendarService.updateEventType(evt)
        .subscribe(evtUpdated => {
          let indexGridData = this.gridDataCreateEventType.findIndex(x => x.eventTypeId === evtUpdated.eventTypeId);

          this.gridDataCreateEventType[indexGridData] = evtUpdated;
        });
    }

    sender.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    // this.editedProduct = undefined;
  }

  public removeHandlerEventType({ dataItem }) {
    this.calendarService.deleteEventType(dataItem.eventTypeId)
      .subscribe(() => {
        this.gridDataCreateEventType = this.gridDataCreateEventType.filter(e => {
          return e.eventTypeId != dataItem.eventTypeId;
        });
      });
  }

  public addHandlerEventType({ sender }, formInstance) {
    formInstance.reset();
    this.closeEditor(sender);

    sender.addRow(new EventType());
  }


  private getCalendarEventFromEventRaw(evRaw: Event): CalendarEvent {
    return {
      title: evRaw.description,
      id: evRaw.eventId,
      color: colors.yellow,
      start: new Date(evRaw.date),
      end: new Date(evRaw.date)
    }
  }

  private getCalendarEvBackFromEventRaw(evRaw: Event): EventBack {
    return {
      eventId: evRaw.eventId,
      description: evRaw.description,
      time: new Date(evRaw.date),
      eventTypeId:  (evRaw.eventType == null) ? 0 : evRaw.eventType.eventTypeId,
      eventType:  (evRaw.eventType == null) ? new EventType() : evRaw.eventType
    }
  }

}
export class EventDay {
  day: Date;
  events: CalendarEvent[]
}

export class EventBack {
  eventId: number;
  description: string;
  eventType: EventType
  eventTypeId: number;
  time: Date;
}
