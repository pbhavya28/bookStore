import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  private baseUrl = 'http://localhost:3000/api/books';

  bookData:any = []
  constructor(private http: HttpClient) {}

  getBookById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);  
  }

  getBooks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  rateBook(id: string, rating: number, comment: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/rate`, { rating, comment });
  }
}
