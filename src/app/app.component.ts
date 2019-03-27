import { Component } from '@angular/core';
import {Events, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Http} from "@angular/http";


import {LandingPage} from "../pages/landing/landing";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LandingPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public httpA: Http,private event:Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


}
