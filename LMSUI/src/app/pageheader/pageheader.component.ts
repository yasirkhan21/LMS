import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pageheader',
  templateUrl: './pageheader.component.html',
  styleUrls: ['./pageheader.component.css']
})
export class PageheaderComponent {
  constructor(public api: ApiService) { }
  @Output() menuClicked = new EventEmitter<boolean>();

  logout() {
    this.api.deleteToken();
  }
}
