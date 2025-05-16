
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Adjust path as needed
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

export interface Book {
  bookId: number;
  title: string;
  author: string;
  coverImage: string;
  _id: string; // MongoDB ID
}


@Component({
  standalone:false,
  selector: 'app-home-comp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = "Home page";
  
   books: Book[] = [];
   userState:boolean = true;
  //  userState:any = LoginComponent.isUserLogged;
  

  constructor(private authService: AuthService, private router: Router,private bookService: BookService) {}

   ngOnInit(): void {
      this.fetchBooks();
    }
  
    fetchBooks(): void {
      this.bookService.getBooks().subscribe((data: Book[]) => {
        this.books = data;
      });
    }

  logoutUser() {
    this.authService.logout().subscribe({
      next: () => {

        this.router.navigate(['/login']);
        this.userState = false;
      },
      error: err => console.error('Logout failed', err)
    });
  }
  
}
