import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  responseMsg: string = '';
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private route: Router) {
    this.loginForm = fb.group({
      email: fb.control('', [Validators.email, Validators.required]),
      password: fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    })
  }
  login() {
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.api.login(loginInfo).subscribe({
      next: (res: any) => {
        console.log(res.toString());
        if (res.toString() === 'Invalid') {
          this.responseMsg = "Invalid Credentials!";
        }
        else {
          this.responseMsg = 'Login Success!';
          this.api.saveToken(res.toString());
          let isActive = this.api.getTokenUserInfo()?.active ?? false;
          if (isActive) {
            this.route.navigateByUrl("/books/library")
          }
           else{ 
            this.responseMsg = "You are not active!";
            setInterval(()=>this.responseMsg = '',5000);
            this.api.deleteToken();
          }
        }
      },
      error: (err: any) => {
        console.log('Error: ')
        console.log(err);
      }
    });
  }
  getEmailErrors() {
    if (this.Email.hasError('required')) return 'E-mail is required!';
    if (this.Email.hasError('email')) return 'E-mail is invalid';
    return '';
  }
  getPasswordErrors() {
    if (this.Password.hasError('required')) return 'Password is required!';
    if (this.Password.hasError('minlength')) return 'Minimun 8 characters are required!';
    if (this.Password.hasError('maxlength')) return 'Maximum 15 characters are required!';
    return '';
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
