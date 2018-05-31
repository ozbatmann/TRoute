import {AfterViewInit, Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/catch';

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
        address: 'Adres',
        footerText: 'All rights reserved.',
        clear: 'Temizle'
    };
    rootUrl = 'http://localhost:3000/';
    _headers = new HttpHeaders();
    currentLocation = {
        lat: null,
        lng: null
    };
    city = '';
    dir = [];
    totalDistance = 0;
    displayMarker = true;
    showClearButton = true;
    zoom = 7;
    tollRoad = true;
    boatFery = true;
    tunnel = true;
    dirtRoad = true;

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
                travelMode: 'DRIVING',
                visible: true
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

                let response: any = res;

                this.places = response.body.json.predictions;
                this.showList = true;

            }, error => {

                console.log('Error: ', error);

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

        console.log(data);

        this.httpClient.post(url, {data}).subscribe(res => {

            let response: any = res;
            this.showClearButton = false;

            if (response.opStatus === true) {
                let coordinates = response.result;
                coordinates.length > 0 ? this.displayMarker = false : this.displayMarker = true;
                this.processResponse(coordinates);

            } else {

                this.showClearButton = true;
                this.displayMarker = true;

            }

        }, error => {

            console.log('Error: ', error);

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

    popFromArray(index) {
        this.addressArray.splice(index, 1);
    }

    clearDirection() {
        for (let i = 0; i < this.dir.length; i++) {
            this.dir[i].visible = false;
        }
        this.addressArray = [];
        this.totalDistance = 0;
        this.showClearButton = true;
        this.displayMarker = true;
    }

}
