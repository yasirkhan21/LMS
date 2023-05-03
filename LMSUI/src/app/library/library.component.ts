import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Book, CategoryBooks } from '../models';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  availableBooks: Book[] = [];
  booksToDisplay: CategoryBooks[] = [];
  displayColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'available',
    'order',
  ];

  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.api.getAllBooks().subscribe({
      next: (res: Book[]) => {
        this.availableBooks = [];
        console.log(res);
        for (var book of res) this.availableBooks.push(book);
        this.updateList();
        //console.log("Update"+ JSON.stringify(this.availableBooks))
      },
      error: (err: any) => console.log(err),
    });
  }
  updateList() {
    //console.log('update1')
    this.booksToDisplay = [];
    for (let book of this.availableBooks) {
      let exist = false;
      for (let CategoryBooks of this.booksToDisplay) {
        if (book.category === CategoryBooks.category
          && book.subCategory === CategoryBooks.subCategory)
          exist = true;
      }
      if (exist) {
        for (let CategoryBooks of this.booksToDisplay) {
          if (book.category === CategoryBooks.category
            && book.subCategory === CategoryBooks.subCategory)
            CategoryBooks.books.push(book);
        }
      }
      else {
        this.booksToDisplay.push({
          category: book.category,
          subCategory: book.subCategory,
          books: [book],
        });
      }
    }
  }
  getBookCount() {
    return this.booksToDisplay.reduce((pv, cv) => cv.books.length + pv, 0);
  }
  search(value: string) {
    value = value.toLowerCase();
    this.updateList();
    if (value.length > 0) {
      this.booksToDisplay = this.booksToDisplay.filter((categoryBooks) => {
        categoryBooks.books = categoryBooks.books.filter((book) =>
          book.title.toLowerCase().includes(value) ||
          book.author.toLowerCase().includes(value)
        );
        return categoryBooks.books.length > 0;
      });
    }
  }

  orderBook(book: Book) {
    let userid = this.api.getTokenUserInfo()?.id ?? 0;
    this.api.orderBook(userid, book.id).subscribe({
      next: (res: any) => {
        if (res === 'Success') {
          book.available = false;
        }
      },
      error: (err: any) => console.log(err)

    })
  }
  isBlocked(){
   let blocked = this.api.getTokenUserInfo()?.blocked ?? true;
    return blocked;
  }
}
