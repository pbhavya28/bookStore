import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  showPassword = false;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.http.post('http://localhost:5000/api/users/register', this.registerForm.value)
      .subscribe({
        next: (res: any) => {
          this.successMessage = res.message || 'Registration successful!';
          this.errorMessage = '';
          this.registerForm.reset();
        },
        error: err => {
          this.errorMessage = err.error.message || 'Registration failed.';
          this.successMessage = '';
        }
      });
  }
}
