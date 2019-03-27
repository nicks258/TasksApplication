//Native imports
import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';

//Local imports
import {HomePage} from '../home/home';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
   @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToHomePage(){
    this.navCtrl.push(HomePage);
  }

  //update the current index according as user scrolls
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    return currentIndex;
  }

}
