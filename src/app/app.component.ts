import {AfterViewInit, Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

    constructor(private httpClient: HttpClient) {
    }

    returned;
    rootUrl = 'http://localhost:3000/';
    _headers = new HttpHeaders();
    title = 'Truck Route';
    lat = 38.1188357;
    lng = 27.7014363;
    city = '';
    nodes = {
        routes: [{
            address: 'Ankara, Türkiye',
            lat: '39.920777',
            lng: '32.854058'
        },
            {
                address: 'İzmir, Türkiye',
                lat: '38.428702',
                lng: '27.134476',
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
        travelMode: 'DRIVING'
    }];

    totalDistance = 0;

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

            let startPoint = {lat: mappedStartPosition.latitude, lng: mappedStartPosition.longitude};
            let endPoint = {lat: mappedEndPosition.latitude, lng: mappedEndPosition.longitude};

            const maneuvers = leg[0].maneuver;
            const lastIndex = maneuvers.length < 23 ? maneuvers.length : 23;

            for (let i = 0; i < lastIndex; i++) {
                let position = maneuvers[i].position;
                let waypoint = {lat: position.latitude, lng: position.longitude};

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

    getPath(): void {
        const url = this.rootUrl + 'api';
        this.httpClient.get(url).subscribe(res => {
            this.returned = res;
            return this.returned;
        });
    }

    searchCity() {
        const url = this.rootUrl + 'search';
        const city = this.city;
        const headers = this._headers.append('Content-Type', 'application/json');
        const options = {
            headers: headers,
            observe: 'response' as 'body'
        };

        this.httpClient.post(url, {city}, options).subscribe(res => {
            console.log(res);
        });
    }

    doGet() {
        const url = this.rootUrl + 'calculate';
        const data = this.nodes;

        this.httpClient.post(url, {data}).subscribe(res => {
            let coordinates = res.result;
            console.log(coordinates);
            this.processResponse(coordinates);
        });
    }

}
