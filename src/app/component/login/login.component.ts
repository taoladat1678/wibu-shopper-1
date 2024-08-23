import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() { }

  onLogin(): void {
    if (this.loginForm.invalid) {
      alert('Vui lòng nhập thông tin hợp lệ.');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);

        let jsonData = JSON.stringify(res);
        let email = this.loginForm.get('email')?.value;
        localStorage.setItem('login', jsonData);
        localStorage.setItem('email', email);



        if (res.isAdmin == 1) {
          const result = confirm("Bạn là Admin, bạn có muốn chuyển sang trang Admin ngay bây giờ ?");
          if (result){
            this.router.navigate(['/category-list']); // Navigate to admin page
          } else {
            this.router.navigate(['/']); // Navigate to home page
          }

        } else {
          alert('Đăng nhập thành công.');
          this.router.navigate(['/']); // Navigate to home page
        }


      },
      (error: any) => {
        console.error(error);
        alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    );
  }
}
