import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';



import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";
import { DataProvider } from '../providers/data/data';
import {GenrePage} from "../pages/genre/genre";
import {LandingPage} from "../pages/landing/landing";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {ProductDetailPage} from "../pages/product-detail/product-detail";


// @ts-ignore
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GenrePage,
    ProductDetailPage,
    LandingPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GenrePage,
    LandingPage,
    ProductDetailPage,
    HomePage,
  ],
  providers: [
    StatusBar,
    InAppBrowser,
    SplashScreen,
    HttpModule,
    DataProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
