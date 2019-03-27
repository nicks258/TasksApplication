// Native imports
import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing'

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

  constructor(public navCtrl: NavController, public navParam:NavParams,private iab: InAppBrowser,
              private socialShare:SocialSharing,private toastCtrl: ToastController) {
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

  shareIt() {
    let env = this;
    env.socialShare.shareViaWhatsApp("Checkout this book ","",this.book.book_link).then(data=>{
      console.log("success");
    }).catch(error=>{
      console.log(error);
    })
  }

  addToWishlist() {
    let toast = this.toastCtrl.create({
      message: 'Book is added to wishlist',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
