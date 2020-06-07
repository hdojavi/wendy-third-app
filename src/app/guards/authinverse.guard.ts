import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthinverseGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userLogged = this.authService.getUserLoggedValue();

    if (!userLogged) {
      return true;
    } else {
      this.router.navigate(['/graphics']);
      return false;
    }
  }
}
