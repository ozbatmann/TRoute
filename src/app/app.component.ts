import {AfterViewInit, Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

    constructor(private httpClient: HttpClient) {
        navigator.geolocation.getCurrentPosition(position => {
            this.currentLocation.lng = +position.coords.longitude;
            this.currentLocation.lat = +position.coords.latitude;
        });
    }

    addressArray = [];
    places = [];
    showList = false;
    returned;
    texts = {
        title: 'Truck Route',
        stopover: 'Nereden - Nereye:',
        roadProfile: 'Yol Profili',
        roadTypes: {
            paidRoad: 'Paralı Yol',
            ferry: 'Feribot',
            tunnel: 'Tünel',
            groundRoad: 'Topraklı Yol'
        },
        calculateRoute: 'Rotayı Hesapla',
        city: 'Şehir',
        footerText: 'All rights reserved.'
    };
    rootUrl = 'http://localhost:3000/';
    _headers = new HttpHeaders();
    currentLocation = {
        lat: null,
        lng: null
    };
    city = '';
    nodes = {
        routes: [{
            address: 'Ankara, Türkiye',
            lat: '39.920777',
            lng: '32.854058'
        },
            {
                address: 'Konya, Türkiye',
                lat: '37.871357',
                lng: '32.50058'
            }],
        params: {
            tollRoad: true,
            boatFery: true,
            tunnel: true,
            dirtRoad: true
        }
    };
    dir = [{
        origin: {
            lat: null,
            lng: null
        },
        destination: {
            lat: null,
            lng: null
        },
        waypoints: [],
        travelMode: null
    }];
    totalDistance = 0;
    displayMarker = true;

    ngAfterViewInit() {
    }

    processResponse(coordinates) {

        for (let j = 0; j < coordinates.length; j++) {
            let waypts = [];

            const leg = coordinates[j][0].leg;
            const summary = coordinates[j][0].summary;

            this.totalDistance += Math.ceil(summary.distance / 1000);

            const mappedStartPosition = leg[0].start.mappedPosition;
            const mappedEndPosition = leg[0].end.mappedPosition;

            let startPoint = {
                lat: mappedStartPosition.latitude,
                lng: mappedStartPosition.longitude
            };
            let endPoint = {
                lat: mappedEndPosition.latitude,
                lng: mappedEndPosition.longitude
            };

            const maneuvers = leg[0].maneuver;
            const lastIndex = maneuvers.length < 23 ? maneuvers.length : 23;

            for (let i = 0; i < lastIndex; i++) {
                let position = maneuvers[i].position;
                let waypoint = {
                    lat: position.latitude,
                    lng: position.longitude
                };

                waypts.push({
                    location: waypoint,
                    stopover: false
                });
            }

            let path = {
                origin: startPoint,
                destination: endPoint,
                waypoints: waypts,
                travelMode: 'DRIVING'
            };

            this.dir.push(path);
        }
    }

    searchCity() {
        const url = this.rootUrl + 'search';
        const city = this.city;
        const headers = this._headers.append('Content-Type', 'application/json');
        const options = {
            headers: headers,
            observe: 'response' as 'body'
        };
        if (this.city.length >= 3) {
            this.httpClient.post(url, {city}, options).subscribe(res => {
                this.places = res.body.json.predictions;
                this.showList = true;
                console.log(this.places);
            });
        }
    }

    doGet() {
        const url = this.rootUrl + 'calculate';
        const data = {
            routes: this.addressArray,
            params: {
                tollRoad: true,
                boatFery: true,
                tunnel: true,
                dirtRoad: true
            }
        };

        this.httpClient.post(url, {data}).subscribe(res => {

            if (res.opStatus === true) {

                let coordinates = res.result;
                coordinates.length > 0 ? this.displayMarker = false : this.displayMarker = true;
                this.processResponse(coordinates);

            } else {

                this.displayMarker = true;

            }

        });
    }

    observeSearchText() {
        if (this.city === '') {
            this.showList = false;
        }
        return this.showList;
    }

    putIntoArray(address) {
        this.addressArray.push(address);
        this.places = [];
        this.city = '';
    }
}
