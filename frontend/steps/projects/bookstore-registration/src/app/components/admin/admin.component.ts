import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

export interface Book {
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
  edition: string;
  _id: string; 

}

@Component({
  standalone:false,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router:Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
    });
  }

deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id.toString()).subscribe({
        next: () => {
          this.fetchBooks(); 
        },
        error: (err) => {
          console.error('Error deleting book:', err);
          alert('Failed to delete book');
        }
      });
    }
  }

  addBook(){
    this.router.navigate(['/add-book'])
  }

  logoutUser() {
    alert("You are Logged Out")
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: err => console.error('Logout failed', err)
    });
  }
}
