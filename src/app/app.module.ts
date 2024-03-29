import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ApplicationRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBuVr4P3TdZYRerMVlLhQjytKEZNgIV0Zw'
        }),
        AgmDirectionModule
    ],
    providers: [],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
