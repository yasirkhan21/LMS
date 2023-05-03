import { Component } from '@angular/core';
import { SideNavItem } from '../models';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  SideNavContent: SideNavItem[] = [
    {
      title: 'view books',
      link: 'books/library',
    },
    {
      title:'mananage books',
      link:'books/maintenance',
    }
    ,
    {
      title:'mananage categories',
      link:'books/categories',
    },
    {
      title:'return book',
      link:'books/return',
    },
    {
      title:'view users',
      link:'users/list'
    },
    {
      title:'all orders',
      link:'users/all-orders'
    },
    
    {
      title:'my orders',
      link:'users/order'
    }
  ];
}
