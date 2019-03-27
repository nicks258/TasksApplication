// Native imports
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})

export class ProductDetailPage {
  bookTitle:string;
  bookAuthor:string;
  reviewPublicationName:string;
  review:string;
  book:any;

  constructor(public navCtrl: NavController, public navParam:NavParams,private iab: InAppBrowser) {
    this.book = this.navParam.get('detail');
    this.bookTitle = this.book.title;
    this.bookAuthor = this.book.author;
    this.reviewPublicationName = this.book.review_publication_name;
    this.review = this.book.review_snippet;
  }

  //initialize inAppBrowser
  reviewLink(){
    const browser = this.iab.create(this.book.review_link);
    //subscribe to open browser event..
    browser.on('loadstop').subscribe(event => {
      // CSS to be added..
      browser.insertCSS({ code: "body{color: red;" });
    });

  }

  bookLink(){
    const browser = this.iab.create(this.book.book_link);
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });
    });
  }

}
