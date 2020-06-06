import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import { HttpClient } from '@angular/common/http';
import { Graphic } from '../models/Graphic';


@Injectable({
  providedIn: 'root'
})
export class GraphicsService {

  private URL_BASE_GRAPHICS = `${Constants.BACKEND_IP}/wendy/graphics`;

  constructor(private http: HttpClient) { }

  getHeartStats(deviceId) {
    return this.http.get<Graphic>(`${this.URL_BASE_GRAPHICS}/heartstats/${deviceId}`);
  }

  getSleepStats(deviceId) {
    return this.http.get<Graphic>(`${this.URL_BASE_GRAPHICS}/sleepstats/${deviceId}`);
  }

  getStepStats(deviceId) {
    return this.http.get<Graphic>(`${this.URL_BASE_GRAPHICS}/stepstats/${deviceId}`);
  }
}
