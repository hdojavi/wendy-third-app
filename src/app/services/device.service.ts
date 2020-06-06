import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/Device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private URL_BASE_DEVICE = `${Constants.BACKEND_IP}/wendy/devices`;

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.URL_BASE_DEVICE}/${id}`);
  }

  getByUUID(uuid: string): Observable<Device> {
    return this.http.get<Device>(`${this.URL_BASE_DEVICE}/UUID/${uuid}`);
  }
}
