import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    constructor(private httpClient: HttpClient) {
    }

    returned;

    title = 'Truck Route';

    // maps
    lat = 38.1188357;
    lng = 27.7014363;


    getPath(): void {
        const url = 'http://localhost:3000/api';
        this.httpClient.get(url).subscribe(res => {
            this.returned = res;
            return this.returned;
        });
    }

    doGet() {
        const url = 'http://localhost:3000/calculate';

        const data = {
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

        this.httpClient.post(url, {data}).subscribe(res => {
            this.returned = res;
            return this.returned;
        });
    }
}
