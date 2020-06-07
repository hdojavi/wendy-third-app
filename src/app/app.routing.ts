import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { QRreaderComponent } from './qrreader/qrreader.component';
import { RegisterComponent } from './register/register.component';
import { AuthinverseGuard } from './guards/authinverse.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes =[

  {
    path: 'qrdevice/:id',
    component: QRreaderComponent,
    canActivate: [AuthinverseGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthinverseGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthinverseGuard]
  },
  {
    path: '',
    redirectTo: 'graphics',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    canActivate: [AuthGuard],
    redirectTo: 'graphics'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
