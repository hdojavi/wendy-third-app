import { NgModule } from '@angular/core';
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    GraphicsComponent,
    UserProfileComponent,
    ContactsComponent,
    CalendarComponent,
    MapsComponent,
    MessagesComponent
  ]
})

export class AdminLayoutModule {}
