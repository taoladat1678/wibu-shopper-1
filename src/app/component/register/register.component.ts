import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerF: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.registerF = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      fullname: new FormControl('', [Validators.required, Validators.minLength(6), this.fullnameValidator]),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('', [Validators.required])
    });


    this.registerF.setValidators(this.passwordMatchValidator());
  }

  ngOnInit() { }


  fullnameValidator(control: AbstractControl): ValidationErrors | null{
    const forbiddenWords = ['ma túy', 'hàng trắng', 'đầu buồi', 'cốn lài', 'cac', 'lol','chém'];
    if(forbiddenWords.some(word => control.value.toLowerCase().includes(word))){
        return {forbiddenWords: true}
    }

    return null;
  }



  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('repassword')?.value;

      if (password != confirmPassword) {
        return {mismatch: true};
      } else {
        return null;
      }
    };
  }

  onRegister() {
    if (this.registerF.invalid) {
      alert('Nhập cho hợp lệ vào ?');
      return console.log('Mày cút');
    }

    if (this.registerF.value.password !== this.registerF.value.repassword) {
      alert('Mật khẩu Bình Dương');
      return console.log('Mật khẩu lỏ');
    }

    this.authService.register(this.registerF.value).subscribe(
      (res: any) => {
        console.log(res);
        alert('OK rồi đấy');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
