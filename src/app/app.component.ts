import {AfterViewInit, Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {google} from '@agm/core/services/google-maps-types';

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
    totalDistance = 0;
    coordinates = {
        'waypoint': [
            {
                'linkId': '-848346233',
                'mappedPosition': {
                    'lat': 39.9207115,
                    'lng': 32.8539598
                },
                'originalPosition': {
                    'lat': 39.920777,
                    'lng': 32.854058
                },
                'type': 'stopOver',
                'spot': 1,
                'sideOfStreet': 'left',
                'mappedRoadName': 'Atatürk Bulvarı',
                'label': 'Atatürk Bulvarı',
                'shapeIndex': 0
            },
            {
                'linkId': '-737633392',
                'mappedPosition': {
                    'lat': 38.4284738,
                    'lng': 27.1345372
                },
                'originalPosition': {
                    'lat': 38.428702,
                    'lng': 27.134476
                },
                'type': 'stopOver',
                'spot': 0.4166667,
                'sideOfStreet': 'right',
                'mappedRoadName': 'İzmir Cumhuriyet Meydanı',
                'label': 'İzmir Cumhuriyet Meydanı',
                'shapeIndex': 3496
            }
        ],
        'mode': {
            'type': 'fastest',
            'transportModes': [
                'truck'
            ],
            'trafficMode': 'disabled',
            'feature': []
        },
        'leg': [
            {
                'start': {
                    'linkId': '-848346233',
                    'mappedPosition': {
                        'lat': 39.9207115,
                        'lng': 32.8539598
                    },
                    'originalPosition': {
                        'lat': 39.920777,
                        'lng': 32.854058
                    },
                    'type': 'stopOver',
                    'spot': 1,
                    'sideOfStreet': 'left',
                    'mappedRoadName': 'Atatürk Bulvarı',
                    'label': 'Atatürk Bulvarı',
                    'shapeIndex': 0
                },
                'end': {
                    'linkId': '-737633392',
                    'mappedPosition': {
                        'lat': 38.4284738,
                        'lng': 27.1345372
                    },
                    'originalPosition': {
                        'lat': 38.428702,
                        'lng': 27.134476
                    },
                    'type': 'stopOver',
                    'spot': 0.4166667,
                    'sideOfStreet': 'right',
                    'mappedRoadName': 'İzmir Cumhuriyet Meydanı',
                    'label': 'İzmir Cumhuriyet Meydanı',
                    'shapeIndex': 3496
                },
                'length': 586100,
                'travelTime': 44560,
                'maneuver': [
                    {
                        'position': {
                            'lat': 39.9207115,
                            'lng': 32.8539598
                        },
                        'instruction': '<span class="street">Atatürk Bulvarı</span> \'na <span class="toward_street">Vekaletler Caddesi</span> \'ne doğru sürünüz. <span class="distance-description"><span class="length">590 m</span> gidiniz.</span>',
                        'travelTime': 77,
                        'length': 590,
                        'id': 'M1',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 39.9154115,
                            'lng': 32.8541315
                        },
                        'instruction': '<span class="direction">Sağdan</span> <span class="next-street">Atatürk Bulvarı</span> \'na, <span class="sign"><span lang="tr">Ayrancı</span>/<span lang="tr">Çankaya</span>/<span lang="tr">Dikmen</span>/<span lang="tr">Gaziosmanpaşa</span>/<span lang="tr">Or-An</span></span> istikametine doğru gitmeye devam ediniz. <span class="distance-description"><span class="length">135 m</span> gidiniz.</span>',
                        'travelTime': 18,
                        'length': 135,
                        'id': 'M2',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 39.9141991,
                            'lng': 32.8541529
                        },
                        'instruction': '<span class="next-street">İsmet İnönü Bulvarı</span> \'na, <span class="sign"><span lang="tr">Dikmen</span>/<span lang="tr">Eskişehir</span>/<span lang="tr">Öveçler</span>/<span lang="tr">Balgat</span></span> istikametine doğru rampaya giriniz. <span class="distance-description"><span class="length">431 m</span> gidiniz.</span>',
                        'travelTime': 72,
                        'length': 431,
                        'id': 'M3',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 39.9143922,
                            'lng': 32.8496253
                        },
                        'instruction': '<span class="next-street">Dikmen Caddesi</span> \'ne, <span class="sign"><span lang="tr">Ayrancı</span>/<span lang="tr">Dikmen</span>/<span lang="tr">Balgat</span>/<span lang="tr">Öveçler</span></span> istikametine doğru <span class="direction">sola</span> dönünüz. <span class="distance-description"><span class="length">2.1 km</span> gidiniz.</span>',
                        'travelTime': 280,
                        'length': 2055,
                        'id': 'M4',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 39.8973012,
                            'lng': 32.8419542
                        },
                        'instruction': '<span class="sign">Çetin Emeç Bulvarı</span> istikametine doğru <span class="direction">sağa</span> dönünüz. <span class="distance-description"><span class="length">277 m</span> gidiniz.</span>',
                        'travelTime': 32,
                        'length': 277,
                        'id': 'M5',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 39.8967433,
                            'lng': 32.8388
                        },
                        'instruction': '<span class="next-street">Çetin Emeç Bulvarı</span> üzerinde devam ediniz. <span class="distance-description"><span class="length">1.3 km</span> gidiniz.</span>',
                        'travelTime': 140,
                        'length': 1261,
                        'id': 'M6',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 39.8948979,
                            'lng': 32.8245628
                        },
                        'instruction': '<span class="direction">Soldan</span> <span class="next-street">Çetin Emeç Bulvarı</span> \'na, <span class="sign"><span lang="tr">100. Yıl</span>/<span lang="tr">Çukurambar</span>/<span lang="tr">Konya</span>/<span lang="tr">İstanbul</span>/<span lang="tr">Havalimanı</span>/<span lang="tr">Samsun</span></span> istikametine doğru gitmeye devam ediniz. <span class="distance-description"><span class="length">858 m</span> gidiniz.</span>',
                        'travelTime': 128,
                        'length': 858,
                        'id': 'M7',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 39.8973548,
                            'lng': 32.8157651
                        },
                        'instruction': '<span class="next-street">Mevlana Bulvarı</span> \'na, <span class="sign"><span lang="tr">Otogar(AŞTİ)</span>/<span lang="tr">Havalimanı</span>/<span lang="tr">Samsun</span>/<span lang="tr">Eskişehir</span></span> istikametine doğru rampaya giriniz. <span class="distance-description"><span class="length">1.9 km</span> gidiniz.</span>',
                        'travelTime': 179,
                        'length': 1905,
                        'id': 'M8',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 39.9133837,
                            'lng': 32.8145421
                        },
                        'instruction': '<span class="next-street">Dumlupınar Bulvarı</span> \'na, <span class="sign"><span lang="tr">İstanbul</span>/<span lang="tr">Ümitköy</span>/<span lang="tr">Eskişehir</span></span> istikametine doğru rampaya giriniz. <span class="distance-description"><span class="length">10.3 km</span> gidiniz.</span>',
                        'travelTime': 815,
                        'length': 10334,
                        'id': 'M9',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 39.9050152,
                            'lng': 32.696954
                        },
                        'instruction': '<span class="direction">Soldan</span> <span class="next-street">Dumlupınar Bulvarı</span> \'na, <span class="sign"><span lang="tr">Konutkent</span>/<span lang="tr">İstanbul</span>/<span lang="tr">Eskişehir</span></span> istikametine doğru gitmeye devam ediniz. <span class="distance-description"><span class="length">6.4 km</span> gidiniz.</span>',
                        'travelTime': 531,
                        'length': 6441,
                        'id': 'M10',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 39.8679793,
                            'lng': 32.6391685
                        },
                        'instruction': '<span class="direction">Soldan</span> <span class="next-street">Eskişehir Yolu</span> <span class="number">(D-200)</span> istikametine doğru gitmeye devam ediniz. <span class="distance-description"><span class="length">115 km</span> gidiniz.</span>',
                        'travelTime': 7729,
                        'length': 114870,
                        'id': 'M11',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 39.4333649,
                            'lng': 31.5370381
                        },
                        'instruction': '<span class="number">E96</span> \'a, <span class="sign"><span lang="tr">Afyonkarahisar</span>/<span lang="tr">Antalya</span>/<span lang="tr">İzmir</span></span> istikametine doğru rampaya giriniz. <span class="distance-description"><span class="length">117 km</span> gidiniz.</span>',
                        'travelTime': 8189,
                        'length': 117111,
                        'id': 'M12',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 38.7701619,
                            'lng': 30.5837166
                        },
                        'instruction': '<span class="next-street">Çevre Yolu Bulvarı</span> <span class="number">(E96)</span> \'na, <span class="sign"><span lang="tr">Otogar</span>/<span lang="tr">Kütahya</span>/<span lang="tr">İstanbul</span>/<span lang="tr">Denizli</span>/<span lang="tr">Antalya</span>/<span lang="tr">İzmir</span>/<span lang="tr">A.K.Ü. Rektörlüğü</span>/<span lang="tr">Afyonkarahisar</span>/<span lang="tr">Devlet Hastanesi</span>/<span lang="tr">A.K.Ü Hastanesi</span></span> istikametine doğru rampaya giriniz. <span class="distance-description"><span class="length">27.9 km</span> gidiniz.</span>',
                        'travelTime': 2331,
                        'length': 27917,
                        'id': 'M13',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 38.793143,
                            'lng': 30.2789426
                        },
                        'instruction': '<span class="number">E96</span> üzerinde devam ediniz. <span class="distance-description"><span class="length">17.1 km</span> gidiniz.</span>',
                        'travelTime': 1230,
                        'length': 17131,
                        'id': 'M14',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 38.7921238,
                            'lng': 30.0830662
                        },
                        'instruction': '<span class="number">E96</span> üzerinde devam ediniz. <span class="distance-description"><span class="length">281 km</span> gidiniz.</span>',
                        'travelTime': 22136,
                        'length': 280783,
                        'id': 'M15',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 38.4415483,
                            'lng': 27.170198
                        },
                        'instruction': '<span class="next-street">Altınyol Caddesi</span> üzerinde devam ediniz. <span class="distance-description"><span class="length">130 m</span> gidiniz.</span>',
                        'travelTime': 15,
                        'length': 130,
                        'id': 'M16',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 38.4405613,
                            'lng': 27.1694148
                        },
                        'instruction': '<span class="next-street">Liman Caddesi</span> \'ne, <span class="sign"><span lang="tr">Liman</span>/<span lang="tr">Alsancak</span>/<span lang="tr">Kordon</span></span> istikametine doğru rampaya giriniz. <span class="distance-description"><span class="length">2.0 km</span> gidiniz.</span>',
                        'travelTime': 181,
                        'length': 2016,
                        'id': 'M17',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 38.4395635,
                            'lng': 27.1475816
                        },
                        'instruction': '<span class="next-street">Atatürk Caddesi</span> üzerinde <span class="sign"><span lang="tr">Kültürpark</span>/<span lang="tr">Şehir Merkezi</span></span> istikametine doğru gitmeye devam ediniz. <span class="distance-description"><span class="length">291 m</span> gidiniz.</span>',
                        'travelTime': 83,
                        'length': 291,
                        'id': 'M18',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 38.4370422,
                            'lng': 27.1475708
                        },
                        'instruction': '<span class="direction">Sağdan</span> <span class="next-street">Şair Eşref Bulvarı</span> istikametine doğru gitmeye devam ediniz. <span class="distance-description"><span class="length">28 m</span> gidiniz.</span>',
                        'travelTime': 15,
                        'length': 28,
                        'id': 'M19',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 38.4368062,
                            'lng': 27.1474743
                        },
                        'instruction': '<span class="next-street">Talatpaşa Bulvarı</span> \'na, <span class="sign"><span lang="tr">Alsancak İskele</span>/<span lang="tr">Kordon</span></span> istikametine doğru <span class="direction">sağa</span> dönünüz. <span class="distance-description"><span class="length">894 m</span> gidiniz.</span>',
                        'travelTime': 233,
                        'length': 894,
                        'id': 'M20',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 38.433094,
                            'lng': 27.1384943
                        },
                        'instruction': '<span class="next-street">Cumhuriyet Bulvarı</span> istikametine doğru <span class="direction">sola</span> dönünüz. <span class="distance-description"><span class="length">525 m</span> gidiniz.</span>',
                        'travelTime': 126,
                        'length': 525,
                        'id': 'M21',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 38.4293604,
                            'lng': 27.1348786
                        },
                        'instruction': '<span class="next-street">İzmir Cumhuriyet Meydanı</span> üzerinde devam ediniz. <span class="distance-description"><span class="length">117 m</span> gidiniz.</span>',
                        'travelTime': 20,
                        'length': 117,
                        'id': 'M22',
                        '_type': 'PrivateTransportManeuverType'
                    },
                    {
                        'position': {
                            'lat': 38.4284738,
                            'lng': 27.1345372
                        },
                        'instruction': '<span class="street">İzmir Cumhuriyet Meydanı</span> hedefinize vardınız. Hedefiniz sağda.',
                        'travelTime': 0,
                        'length': 0,
                        'id': 'M23',
                        '_type': 'PrivateTransportManeuverType'
                    }
                ]
            }
        ],
        'summary': {
            'distance': 586100,
            'trafficTime': 45235,
            'baseTime': 44560,
            'flags': [
                'tunnel',
                'builtUpArea'
            ],
            'text': '',
            'travelTime': 44560,
            '_type': 'RouteSummaryType'
        }
    };

    dir = {
        origin: {
            lat: 39.9207115,
            lng: 32.8539598
        },
        destination: {
            lat: 38.4284738,
            lng: 27.1345372
        },
        waypoints: [],
        travelMode: "DRIVING"
    };

    ngAfterViewInit() {
    }

    processResponse() {
        let waypts = [];

        const leg = this.coordinates.leg;
        const summary = this.coordinates.summary;

        this.totalDistance += Math.ceil(summary.distance / 1000);

        const mappedStartPosition = leg[0].start.mappedPosition;
        const mappedEndPosition = leg[0].end.mappedPosition;

        let startPoint = new google.maps.LatLng(mappedStartPosition.lat, mappedStartPosition.lng);
        let endPoint = new google.maps.LatLng(mappedEndPosition.lat, mappedEndPosition.lng);

        const maneuvers = leg[0].maneuver;
        const lastIndex = maneuvers.length < 23 ? maneuvers.length : 23;

        for (let i = 0; i < lastIndex; i++) {
            const position = maneuvers[i].position;
            const waypoint = new google.maps.LatLng(position.lat, position.lng);

            waypts.push({
                location: waypoint,
                stopover: false
            });
        }

        this.dir = {
            origin: startPoint,
            destination: endPoint,
            waypoints: waypts,
            travelMode: google.maps.TravelMode.DRIVING
        };
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
            this.returned = res;
            return this.returned;
        });
    }

}
