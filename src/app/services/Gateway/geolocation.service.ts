import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../../utils/Constants';
import { GeocodeApiResponse } from '../../models/GoogleAPIs/GeocodeApiResponse';

@Injectable({
  providedIn: 'root'
})
export class GeolocationGoogleService {

  constructor(private http: HttpClient) {
  }

  getAddressByLatitudeLongitude(latitude: number, longitude: number): Observable<GeocodeApiResponse> {
    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString());

    return this.http.get<GeocodeApiResponse>(`${Constants.BACKEND_IP}/gateway/directionByCoordinates`, { params });
  }
}
