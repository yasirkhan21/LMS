import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  columnsToDisplay: string[] = [
    'id',
    'name',
    'email',
    'mobile',
    'fine',
    'blocked',
    'active',
    'createdOn',
    'action'
  ];
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.api.getAllUsers().subscribe({
      next: (res: User[]) => {
        this.users = [];
        this.users = res;
        console.log(res);
      },
      error: (err: any) => console.log(err),
    });
  }

  blockUser(user: User) {
    if(user.blocked){
    this.api.unblockUser(user.id).subscribe({
      next: (res: any) => {
        if (res === "Success") user.blocked = false;
      },
      error: (err: any) => console.log(err),
    });
  }
  else{
    this.api.blockUser(user.id).subscribe({
      next: (res: any) => {
        if (res === "Success") user.blocked = true;
      },
      error: (err: any) => console.log(err),
    });
  }
  }
  enableUser(user: User) {
    if(user.active){
    this.api.disableUser(user.id).subscribe({
      next: (res: any) => {
        if (res === "Success") user.active = false;
      },
      error: (err: any) => console.log(err),
    });
  }
  else{
    this.api.enableUser(user.id).subscribe({
      next: (res: any) => {
        if (res === "Success") user.active = true;
      },
      error: (err: any) => console.log(err),
    });
  }
  }
}
