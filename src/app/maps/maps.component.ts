import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Constants } from '../utils/Constants';

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

    constructor() {
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
            style: `mapbox://styles/mapbox/streets-v11`,
            zoom: 13,
            center: [this.lng, this.lat]
        });
        this.map.addControl(new mapboxgl.NavigationControl());
    }
}
