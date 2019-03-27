//All native imports
import {Component} from '@angular/core';
import {ActionSheetController, Events, LoadingController, NavController} from 'ionic-angular';
import {global} from "../../app/global";
import {Http} from "@angular/http";
import {FormControl} from "@angular/forms";
import {DataProvider} from "../../providers/data/data";
//All local imports
import {ProductDetailPage} from "../product-detail/product-detail";
import {GenrePage} from "../genre/genre";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  homeUrl: string;
  books = [];
  isEventsPublished: boolean = false;
  searchTerm: string = '';
  searchControl: FormControl;
  filterNumber: string;
  items: any;
  searching: any = false;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, public httpA: Http,
              private event: Events, public dataService: DataProvider, public actionSheetCtrl: ActionSheetController) {
    //initialising formControl for searchListner
    this.searchControl = new FormControl();

  }

  //Native functions to override

  //when view will enter this function starts
  ionViewWillEnter() {
    let env = this;
    // check to see if any filter is applied if yes subscribe to that event if not go for default API
    this.event.subscribe('filter_string', (data) => {
      console.log(data);
      this.homeUrl = global.getUrl("recent_recos", data);
      this.isEventsPublished = true;
      env.filterNumber = "1";
    });
    if (!this.isEventsPublished) {
      this.homeUrl = global.getUrl("recent_recos", 'all-books');
      env.filterNumber = "";
    }
    // Once we checked isEvent is subscribed or not API url is set and call the method to parse json
    this.getApiData();
  }

  ionViewDidLoad() {
    this.dataService.getApiData();
    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }


  //Local methods

  getApiData() {
    let env = this;
    //create a loader to be displayed while waiting for API response..
    let loading = this.loadingCtrl.create({
      content: 'Fetching...',
      spinner: 'circles'
    });
    loading.present();
    let useFullDatal: any;
    let newsFeedJsonArray = [{}];
    // generating and creating HTTP GET request and MAP to JSON
    this.httpA.get(env.homeUrl).map(res => res.json()).subscribe(data => {
      console.log(data);
      this.books = data;
      this.items = data;
      newsFeedJsonArray = data;
      loading.dismiss();
    }, error1 => {
      alert("Something went wrong");
      loading.dismiss();
    })
  }

  //showing search loader
  onSearchInput() {
    this.searching = true;
  }

  // setting filter search array to be shown according to user search
  setFilteredItems() {
    this.items = this.dataService.filterItems(this.searchTerm);
  }

  //opening categories page
  openFilterPage() {
    this.navCtrl.push(GenrePage);
  }

  sort() {
    //Initialise bottom action bar with necessary options
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Sort with name',
      buttons: [
        {
          text: 'Title -- A-Z',
          role: 'destructive',
          handler: () => {
            this.albhabaticallySort();
          }
        }, {
          text: 'Title -- Z-A',
          handler: () => {
            this.reversAlbhabaticallySort();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  //sort an array albhabatically by compare objects(title)
  albhabaticallySort() {
    var sortedArray = this.items.sort(function (a, b) {
      if (a.title < b.title) return -1;
      else if (a.title > b.title) return 1;
      return 0;
    });
  }

  reversAlbhabaticallySort() {
    var sortedArray = this.items.sort(function (a, b) {
      if (a.title > b.title) return -1;
      else if (a.title < b.title) return 1;
      return 0;
    });
  }

  //pass a book object to product detail
  productPage(books) {
    this.navCtrl.push(ProductDetailPage, {detail: books})
  }

  // remove filter & and set API url to default and call the api again
  removeFilter() {
    this.isEventsPublished = false;
    this.homeUrl = global.getUrl("recent_recos", 'all-books');
    this.filterNumber = "";
    this.getApiData();
  }
}
