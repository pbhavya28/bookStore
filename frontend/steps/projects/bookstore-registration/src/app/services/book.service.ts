import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  private baseUrl = 'http://localhost:5000/api/books';
  private apiUrl = 'http://localhost:5000/api'; // Define apiUrl here

  bookData: any = [];
  constructor(private http: HttpClient) {}

  getBookById(bookId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${bookId}`);  
  }

  getBooks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

 
  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${bookId}`);
  }


  rateBook(bookId: string, payload: { rating: number; comment: string }, username: string): Observable<any> {
    const headers = { username }; 
    console.log('Headers being sent:', headers); 
    return this.http.post(`${this.baseUrl}/${bookId}/rate`, payload, { headers });
  }

  getRelatedBooks(bookId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/explore-more/${bookId}`);
  }
}