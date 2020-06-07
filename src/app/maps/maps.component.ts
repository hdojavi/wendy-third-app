import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Constants } from '../utils/Constants';
import { GeolocationGoogleService } from '../services/Gateway/geolocation.service';
import { GeolocationStat } from '../models/GeolocationStat';
import { GeolocationstatsService } from '../services/geolocationstats.service';
import * as moment from 'moment';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

    mapbox = (mapboxgl as typeof mapboxgl);
    map: mapboxgl.Map;
    lat = 0;
    lng = 0;
    marker: mapboxgl.Marker;

    geolocationStats: GeolocationStat[];
    address: string;
    time: string;
    selectedTime;

    constructor(private geolocationGoogleService: GeolocationGoogleService, private geolocationStatService: GeolocationstatsService) {
        this.geolocationStatService.getLatestPositions()
            .subscribe(gs => {
                gs.forEach(i => i.formatDate = moment(i.date).format('DD/MM/YYYY HH:mm'));
                this.geolocationStats = gs;

                this.selectedTime = gs[0].geolocationStatId;
            });
    }

    ngOnInit() {
        this.mapbox.accessToken = Constants.MAPBOX_TOKEN;

        navigator.geolocation.getCurrentPosition(
            resp => {
                this.lng = resp.coords.longitude;
                this.lat = resp.coords.latitude;

                this.buildMap();
            },
            err => {
                console.log(err);
            });
    }

    buildMap() {
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 13,
            center: [this.lng, this.lat]
        });
        this.marker = new mapboxgl.Marker()
            .setLngLat([this.lng, this.lat])
            .addTo(this.map);

        this.updateData()

        this.map.addControl(new mapboxgl.NavigationControl());
    }

    changePosition(geolocationStat: GeolocationStat) {
        let lnglat: any = [geolocationStat.longitude, geolocationStat.latitude];

        this.map.setCenter(lnglat);
        this.marker.setLngLat(lnglat);
        this.time = moment(geolocationStat.date).format('DD/MM/YYYY HH:mm');

        this.updateData();
    }

    private updateData() {
        this.geolocationGoogleService.getAddressByLatitudeLongitude(this.lat, this.lng)
            .subscribe(a => this.address = a.results[0].formatted_address);
    }
}
