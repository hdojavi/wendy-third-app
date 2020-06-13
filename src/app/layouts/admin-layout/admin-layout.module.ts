import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { GraphicsComponent } from '../../graphics/graphics.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ContactsComponent } from '../../contacts/contacts.component';
import { CalendarComponent } from '../../calendar/calendar.component';
import { MapsComponent } from '../../maps/maps.component';
import { MessagesComponent } from '../../messages/messages.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CommandsComponent } from '../../commands/commands.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    NgSelectModule,
    FormsModule,
    ChartsModule,
    NgbModule,
    ReactiveFormsModule,
    MatTableModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ToastrModule.forRoot(),
    ButtonsModule,
    GridModule,
    DateInputsModule
  ], providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ],
  declarations: [
    GraphicsComponent,
    UserProfileComponent,
    ContactsComponent,
    CalendarComponent,
    MapsComponent,
    MessagesComponent,
    CommandsComponent
  ]
})

export class AdminLayoutModule { }
