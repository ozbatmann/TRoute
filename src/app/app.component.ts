import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private httpClient: HttpClient) { }
  title = 'app';
  returned;

  doGet() {
    const url = 'http://localhost:3000/api';
    this.httpClient.get(url).subscribe(res => {
      this.returned = res;
      return this.returned;
    });
  }
}
