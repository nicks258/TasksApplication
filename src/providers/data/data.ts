//All native imports
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {global} from "../../app/global";
import {Events, LoadingController, NavController} from "ionic-angular";

@Injectable()
export class DataProvider {
  items: any = [];
  isEventsPublished:boolean = false;
  searchUrl:string;

  constructor(private loadingCtrl : LoadingController,public httpA: Http,private event:Events) {
    //if event is published then this block will run..
    this.event.subscribe('filter_string',(data)=>{
      console.log(data);
      this.searchUrl = global.getUrl("recent_recos" , data);
      this.isEventsPublished = true;
      this.getApiData();
    });
    //check if event is published or not...
    if (!this.isEventsPublished){
      this.searchUrl = global.getUrl("recent_recos" , 'all-books');
      this.getApiData();
    }
  }

  //get search text that user types and find that it exists or not
  filterItems(searchTerm){
    return this.items.filter((item) => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  // create HTTP request to initialize the array to be search..
  getApiData() {
    let env = this;
    console.log("fetching api data");
    let loading = this.loadingCtrl.create({
      content: 'Fetching...',
      spinner: 'circles'
    });
    loading.present();
    let useFullDatal: any;
    let newsFeedJsonArray = [{}];
    console.log("noydd " + env.searchUrl);
    this.httpA.get(env.searchUrl).map(res => res.json()).subscribe(data => {
      console.log(data);
      this.items = data;
      newsFeedJsonArray = data;
      loading.dismiss();
    }, error1 => {
      console.log("error " + error1);
      loading.dismiss();
    })
  }

}
