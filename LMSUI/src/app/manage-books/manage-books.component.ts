import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent {
  addBookForm!: FormGroup;
  deleteBookForm!: FormControl;
  addMsg: string = '';
  deleteMsg: string = '';
  constructor(private api: ApiService, private fb: FormBuilder) {
    this.addBookForm = fb.group({
      title: fb.control('', [Validators.required]),
      author: fb.control('', [Validators.required]),
      category: fb.control('', [Validators.required]),
      subcategory: fb.control('', [Validators.required]),
      price: fb.control('', [Validators.required]),
    });
    this.deleteBookForm = fb.control('', [Validators.required]);
  }

  insertBook() {
    let book = {
      id: 0,
      title: this.Title.value,
      category: {
        category: this.Category.value,
        subcategory: this.Subcategory.value
      },
      price: this.Price.value,
      available: true,
      author: this.Author.value
    };
    this.api.insertBook(book).subscribe({
      next: (res: any) => {
        this.addMsg = 'Book Inserted!';
        setInterval(() => (this.addMsg = ''), 5000);
        this.Title.setValue('');
        this.Author.setValue('');
        this.Category.setValue('');
        this.Subcategory.setValue('');
        this.Price.setValue('');
      },
      error: (err: any) => console.log(err),
    });
  }

  deleteBook() {
    let id: number = parseInt(this.deleteBookForm.value);
    this.api.deleteBook(id).subscribe({
      next: (res: any) => {
        if (res === 'Success') {
          this.deleteMsg = "Book Deleted";
        } else {
          this.deleteMsg = "Book Not Found!";
        }
        setInterval(() => (this.deleteMsg = ''), 5000);
      },
      error: (err: any) => console.log(err),
    });
  }
  get Title(): FormControl {
    return this.addBookForm.get('title') as FormControl;
  }
  get Author(): FormControl {
    return this.addBookForm.get('author') as FormControl;
  }
  get Category(): FormControl {
    return this.addBookForm.get('category') as FormControl;
  }
  get Subcategory(): FormControl {
    return this.addBookForm.get('subcategory') as FormControl;
  }
  get Price(): FormControl {
    return this.addBookForm.get('price') as FormControl;
  }
}
