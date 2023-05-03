import { Component } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { User, UserType } from '../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  responseMsg: string = '';
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService) {
    this.registerForm = fb.group({
      firstName: fb.control('', [Validators.required]),
      lastName: fb.control('', [Validators.required]),
      email: fb.control('', [Validators.email, Validators.required]),
      password: fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      rpassword: fb.control(''),
      userType: fb.control('student'),
    }, {
      validators: [repeatPasswordValidator],
    } as AbstractControlOptions);

  }
  register() {
    let user: User = {
      id: 0,
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      mobile: '',
      password: this.registerForm.get('password')?.value,
      blocked: false,
      active: false,
      createdOn: '',
      userType: UserType.USER,
      fine: 0
    };
    this.api.CreateAccount(user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.responseMsg = res.toString();
      }, error: (err: any) => {
        console.log('Error: ')
        console.log(err)
      },
    })
  }

  getFirstNameErrors() {
    if (this.FirstName.hasError('required')) return 'Field is required!';
    // if(this.FirstName.hasError('pattern')) return 'Should start with alphabet';
    return '';
  }

  getLastNameErrors() {
    if (this.LastName.hasError('required')) return 'Field is required!';
    return '';
  }

  getEmailErrors() {
    if (this.Email.hasError('required')) return 'Field is required!';
    if (this.Email.hasError('email')) return 'E-mail is invalid';
    return '';
  }
  getPasswordErrors() {
    if (this.Password.hasError('required')) return 'Field is required!';
    if (this.Password.hasError('minlength')) return 'Minimun 8 characters are required!';
    if (this.Password.hasError('maxlength')) return 'Maximum 15 characters are required!';
    return '';
  }


  get FirstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get RPassword(): FormControl {
    return this.registerForm.get('rpassword') as FormControl;
  }
}


export const repeatPasswordValidator: ValidatorFn = (
  control: AbstractControl): ValidationErrors | null => {
  const pwd = control.get('password')?.value;
  const rpwd = control.get('rpassword')?.value;
  console.log(pwd+""+rpwd)
  if (pwd === rpwd) {
    control.get('rpassword')?.setErrors(null);
    return null;
  }
  else {
    control.get('rpassword')?.setErrors({ rpassword: true });
    return { rpassword: true };
  }
};