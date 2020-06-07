import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GeolocationStat } from '../models/GeolocationStat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationstatsService {

  private URL_BASE_GEOLOCATIONSTATS = `${Constants.BACKEND_IP}/wendy/geolocationstats`;

  constructor(private http: HttpClient, private authService: AuthService) { 
  }

  getLatestPositions(): Observable<GeolocationStat[]> {
    return this.http.get<GeolocationStat[]>(`${this.URL_BASE_GEOLOCATIONSTATS}/latest/${this.authService.getUserLoggedValue().deviceId}`);
  }



}
