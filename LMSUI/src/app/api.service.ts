import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { Book, Order, User, UserType } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl = 'https://localhost:44362/api/Library/'
  constructor(private http: HttpClient, private jwt: JwtHelperService) { }
  CreateAccount(user: User) {
    return this.http.post(this.baseurl + 'CreateAccount', user, {
      responseType: 'text',
    });
  }

  login(loginInfo: any) {
    let param = new HttpParams()
      .append("email", loginInfo.email)
      .append("password", loginInfo.password)
    return this.http.get(this.baseurl + 'Login', {
      params: param,
      responseType: 'text',
    });
  }

  saveToken(token: string) {
    localStorage.setItem("access_token", token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("access_token");
  }

  deleteToken() {
    localStorage.removeItem('access_token');
    location.reload();
  }

  getTokenUserInfo(): User | null {
    //console.log(1)
    if (!this.isLoggedIn()) return null;
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      firstName: token.firstName,
      lastName: token.lastName,
      email: token.email,
      mobile: token.mobile,
      password: '',
      blocked: token.blocked.toLowerCase() === 'true',
      active: token.active.toLowerCase() === 'true',
      createdOn: token.createdAt,
      userType: token.userType === 'USER' ? UserType.USER : UserType.ADMIN,
      fine: 0,
    };
    return user;
  }

  getAllBooks() {
    return this.http.get<Book[]>(this.baseurl + 'GetAllBooks');
  }

  orderBook(userId: number, bookId: number) {
    return this.http.get(this.baseurl + 'OrderBook/' + userId + '/' + bookId, {
      responseType: 'text',
    });
  }

  getOrdesOfUser(userid: number) {
    return this.http.get<Order[]>(this.baseurl + 'GetOrders/' + userid);
  }

  getAllOrders() {
    return this.http.get<Order[]>(this.baseurl + "GetAllOrders");
  }

  returnBook(bookId: string, userId: string) {
    return this.http.get(this.baseurl + 'ReturnBook/' + bookId + '/' + userId, {
      responseType: 'text',
    });
  }


  getAllUsers() {
    return this.http.get<User[]>(this.baseurl + 'GetAllUsers').pipe(
      map((users) =>
        users.map((user) => {
          let temp: User = user;
          temp.userType = user.userType == 0 ? UserType.USER : UserType.ADMIN;
          return temp;
        })
      )
    );
  }

  blockUser(id: number) {
    return this.http.get(this.baseurl + 'ChangeBlockStatus/1/' + id, {
      responseType: 'text'
    })
  }

  unblockUser(id: number) {
    return this.http.get(this.baseurl + 'ChangeBlockStatus/0/' + id, {
      responseType: 'text'
    })
  }
  enableUser(id: number) {
    return this.http.get(this.baseurl + 'ChangeEnableStatus/1/' + id, {
      responseType: 'text'
    })
  }
  disableUser(id: number) {
    return this.http.get(this.baseurl + 'ChangeEnableStatus/0/' + id, {
      responseType: 'text'
    })
  }

  insertBook(book: any) {
    return this.http.post(this.baseurl + 'InsertBook', book, {
      responseType: 'text',
    });
  }

  deleteBook(id: number) {
    return this.http.delete(this.baseurl + 'DeleteBook/' + id, {
      responseType: 'text'
    });
  }

  insertCategory(category: string, subcategory: string) {
    return this.http.post(this.baseurl + 'InsertCategory',
      { category: category, subcategory: subcategory },
      { responseType: 'text', });
  }
}
