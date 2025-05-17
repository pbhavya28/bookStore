import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-register',
  standalone: false,
  templateUrl: './bookRegister.component.html',
  styleUrls: ['./bookRegister.component.css']
})
export class BookRegisterComponent {
  bookForm: FormGroup;
  imageCount = 1;

  constructor(private fb: FormBuilder, private http: HttpClient, private authservice: AuthService, private router:Router) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: [''],
      publishDate: [''],
      edition: [''],
      isbn: [''],
      language: [''],
      pages: [0, Validators.min(1)],
      price: [0, Validators.min(0)],
      currency: ['USD'],
      category: [''],
      description: [''],
      coverImage: [''],
      downloadLink: [''],
      images: this.fb.array([
        this.fb.control(''),
      ]),
      ratings: this.fb.array([]),  
      feedback: this.fb.array([]), 
      exploreMore: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control('')
      ]),
      tags: this.fb.array([
        this.fb.control('')
      ])
    });
  }

  get images(): FormArray {
    return this.bookForm.get('images') as FormArray;
  }

  get exploreMore(): FormArray {
    return this.bookForm.get('exploreMore') as FormArray;
  }

  get tags(): FormArray {
    return this.bookForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.fb.control(''));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }


  setImageFields(count: number): void {
    const imagesArray = this.bookForm.get('images') as FormArray;
    imagesArray.clear();
    for (let i = 0; i < count; i++) {
      imagesArray.push(this.fb.control('', Validators.required));
    }
  }

  updateImageFields(event: any): void {
    const count = Number(event.target.value);
    if (count >= 0) {
      this.imageCount = count;
      this.setImageFields(count);
    }
  }

submitBook(): void {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
  
      this.http.post('http://localhost:3000/api/books', bookData).subscribe({
        next: (res) => {
          console.log('Book submitted successfully:', res);
          alert('Book saved!');
          this.router.navigate(['/admin'])
          this.bookForm.reset(); 
        },
        error: (err) => {
          console.error('Error submitting book:', err);
          alert('Failed to save book. Please try again.');
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

  logoutUser() {
    alert("You are Logged Out")
    this.authservice.logout().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: err => console.error('Logout failed', err)
    });
  }
}
