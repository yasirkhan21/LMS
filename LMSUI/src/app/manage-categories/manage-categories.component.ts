import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent {
  categoryForm!: FormGroup;
  msg: string = '';
  constructor(private api: ApiService, private fb: FormBuilder) {
    this.categoryForm = fb.group({
      category: fb.control('', [Validators.required]),
      subcategory: fb.control('', [Validators.required])

    });
  }

  addNewCategory() {
    let category = this.Category.value;
    let subcategory = this.Subcategory.value;
    this.api.insertCategory(category, subcategory).subscribe({
      next: (res: any) => {
        this.msg = res.toString();
        setInterval(() => this.msg = " ", 5000);
      },
      error: (err: any) => console.log(err),
    });
  }
  get Category(): FormControl {
    return this.categoryForm.get('category') as FormControl;
  }

  get Subcategory(): FormControl {
    return this.categoryForm.get('subcategory') as FormControl;
  }
}
