import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  _id?: string;
  bookId: number;
  title: string;
  author: string;
  description?: string;
  ratings?: number[];
  feedback?: string[];
  downloadLink?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  private baseUrl = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) {}

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  rateBook(id: string, rating: number, comment: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/rate`, { rating, comment });
  }

  downloadBook(downloadLink: string): void {
    window.open(downloadLink, '_blank');
  }
}



// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// // Optional: Define a Book interface for strong typing
// export interface Book {
//   _id?: string;
//   bookId: number;
//   title: string;
//   author: string;
//   description?: string;
//   ratings?: number[];
//   feedback?: string[];
//   downloadLink?: string;
//   [key: string]: any; // Allow other optional fields
// }

// @Injectable({ providedIn: 'root' })
// export class BookService {
//   private baseUrl = 'http://localhost:3000/api/books';

//   constructor(private http: HttpClient) {}

//   // GET a book by bookId
//   getBookById(id: string): Observable<Book> {
//     return this.http.get<Book>(`${this.baseUrl}/${id}`);
//   }

//   // GET all books
//   getAllBooks(): Observable<Book[]> {
//     return this.http.get<Book[]>(this.baseUrl);
//   }

//   // POST a new book
//   addBook(book: Book): Observable<Book> {
//     return this.http.post<Book>(this.baseUrl, book);
//   }

//   // POST rating and optional comment
//   rateBook(id: string, rating: number, comment: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/${id}/rate`, { rating, comment });
//   }

//   // Optional: Download book by link (could be handled directly in component)
//   downloadBook(downloadLink: string): void {
//     window.open(downloadLink, '_blank');
//   }
// }
