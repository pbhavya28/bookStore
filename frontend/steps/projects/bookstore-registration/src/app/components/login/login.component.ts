import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

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
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

 

  onSubmit(): void {
    if (this.loginForm.invalid) return;
  
    const { email, password } = this.loginForm.value;
  
    this.http.post('http://localhost:3000/api/users/login', { email, password })
      .subscribe({
        next: (res: any) => {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.loginForm.reset();
          this.isUserLogged = true;
  
          // ✅ Check if user is admin
          if (email === 'admin@gmail.com') {
            this.router.navigate(['/admin']);
        
          } else {
            this.router.navigate(['/home']);
            this.isUserLogged = true;
          }
        },
        error: err => {
          this.errorMessage = err.error.message || 'Login failed.';
          this.successMessage = '';
        }
      });
  }
  
}
