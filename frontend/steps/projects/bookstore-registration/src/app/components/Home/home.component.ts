import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

export interface Book {
  bookId: number;
  title: string;
  author: string;
  coverImage: string;
  _id: string;
}

@Component({
  standalone:false,
  selector: 'app-home-comp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  userState: boolean = false;
  userName: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private bookService: BookService
  ) {
    console.log("=========>>>>>>>>", this.userName)
  }

  ngOnInit(): void {
    this.fetchBooks();

    // Subscribe to login status
    this.authService.isLoggedIn().subscribe(status => {
      this.userState = status;
    });

    this.authService.getUserName().subscribe(name => {
      this.userName = name;
    });
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
    });
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

