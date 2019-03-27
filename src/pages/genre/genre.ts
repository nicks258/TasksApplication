//All native imports
import {Component} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import "rxjs/add/operator/map";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';

//All local imports
import {DataProvider} from "../../providers/data/data";

@Component({
  selector: 'page-genre',
  templateUrl: 'genre.html',
})
export class GenrePage {
  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  books_item :any;
  searching: any = false;

  constructor(public navCtrl: NavController, public dataService: DataProvider,private event:Events) {
    this.searchControl = new FormControl();
    this.loadBooksItem();
  }

  //initialising hardcoded objects of array As there is no such API for getting list of genre
  loadBooksItem(){
    this.books_item = [{
      "description": "All Books",
      "image_url": "assets/books_images/horror.jpg",
      "keyword": "all-books",
    },{
      "description": "Bestsellers",
      "image_url": "assets/books_images/best_seller.png",
      "keyword": "bestsellers",
    },{
      "description": "Fiction",
      "image_url": "assets/books_images/ficition.jpg",
      "keyword": "fiction",
    },{
      "description": "Non-Fiction",
      "image_url": "assets/books_images/non-fiction.jpg",
      "keyword": "non-fiction",
    },{
      "description": "Action-Adventure",
      "image_url": "assets/books_images/action-adventure.jpg",
      "keyword": "action-adventure",
    },{
      "description": "Arts-Photography",
      "image_url": "assets/books_images/arts-photography.jpg",
      "keyword": "arts-photography",
    },{
      "description": "Biographies-Memoirs",
      "image_url": "assets/books_images/biographies-memoirs.jpg",
      "keyword": "biographies-memoirs",
    },{
      "description": "Business-Economics",
      "image_url": "assets/books_images/business-economics.jpg",
      "keyword": "business-economics",
    },{
      "description": "Children-Books",
      "image_url": "assets/books_images/children-s-books.jpg",
      "keyword": "children-s-books",
    },{
      "description": "Comics",
      "image_url": "assets/books_images/comics-graphic-novels.jpg",
      "keyword": "comics-graphic-novels",
    },{
      "description": "Computers-Technology",
      "image_url": "assets/books_images/computers-technology.jpg",
      "keyword": "computers-technology",
    },{
      "description": "Cooking",
      "image_url": "assets/books_images/cooking.jpg",
      "keyword": "cooking",
    },{
      "description": "Crafts-Hobbies",
      "image_url": "assets/books_images/crafts-hobbies-home.png",
      "keyword": "crafts-hobbies-home",
    },{
      "description": "Crime",
      "image_url": "assets/books_images/crime.jpg",
      "keyword": "crime",
    },{
      "description": "Current-Affairs",
      "image_url": "assets/books_images/current-affairs.jpeg",
      "keyword": "current-affairs",
    },{
      "description": "Education-Reference",
      "image_url": "assets/books_images/education-reference.jpg",
      "keyword": "education-reference",
    },{
      "description": "Erotica",
      "image_url": "assets/books_images/erotica.jpg",
      "keyword": "erotica",
    },{
      "description": "Gay-Lesbian",
      "image_url": "assets/books_images/gay-lesbian.jpg",
      "keyword": "gay-lesbian",
    },{
      "description": "Health",
      "image_url": "assets/books_images/health-fitness-dieting.jpg",
      "keyword": "health-fitness-dieting",
    },{
      "description": "History",
      "image_url": "assets/books_images/history.jpg",
      "keyword": "history",
    }]
  }

  // publish an Event filter to all pages to update all URLs
  selectedCategory(books) {
    this.event.publish('filter_string', books.keyword);
    this.navCtrl.pop();
  }

}
