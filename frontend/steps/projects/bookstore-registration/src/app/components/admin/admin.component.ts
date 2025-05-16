import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Route, Router } from '@angular/router';

export interface Book {
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
  edition: string;
  _id: string; // MongoDB ID
}

@Component({
  standalone:false,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router:Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
    });
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book._id !== id);
    });
  }

  addBook(){
    this.router.navigate(['/add-book'])
  }
}
