import { Routes } from '@angular/router';

import { GraphicsComponent } from '../../graphics/graphics.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ContactsComponent } from '../../contacts/contacts.component';
import { CalendarComponent } from '../../calendar/calendar.component';
import { MapsComponent } from '../../maps/maps.component';
import { MessagesComponent } from '../../messages/messages.component';
import { CommandsComponent } from '../../commands/commands.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'graphics', component: GraphicsComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'commands', component: CommandsComponent }
];
