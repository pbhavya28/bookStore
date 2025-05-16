import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users'; // Adjust URL if needed

  constructor(private http: HttpClient) { }

  // Logout function that will hit the backend route
  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`, {
      withCredentials: true,
      responseType: 'text'  // 👈 prevent JSON parsing error
    });
  }
  
}
