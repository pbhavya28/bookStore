import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword = false;
  isUserLogged:boolean = false;
  static isUserLogged: any;

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}
  loginForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

 

  onSubmit(): void {
    if (this.loginForm.invalid) return;
  
    const { email, password } = this.loginForm.value;
  
    this.http.post('http://localhost:5000/api/users/login', { email, password })
      .subscribe({
        next: (res: any) => {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.loginForm.reset();
          this.authService.login('dummyToken'); 
          this.authService.setUserName(res.user.name);
  
          if (email === 'admin@gmail.com') {
            this.router.navigate(['/admin']);
        
          } else {
            this.router.navigate(['/home']);
            this.isUserLogged = true;
          }
          console.log("message======", res)
        },
        error: err => {
          this.errorMessage = err.error.message || 'Login failed.';
          this.successMessage = '';
        }
      });
  }
}
