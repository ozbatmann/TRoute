import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
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
            console.log(res);
            this.returned = res;
            return this.returned;
        });
    }

}
