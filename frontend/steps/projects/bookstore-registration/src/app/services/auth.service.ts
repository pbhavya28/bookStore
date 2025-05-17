import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/users';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userName = new BehaviorSubject<string | null>(null); 

  constructor(private http: HttpClient) {
    const isLoggedIn = !!localStorage.getItem('token');
    this.loggedIn.next(isLoggedIn);

    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.userName.next(storedName);
    }
  }
  

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }
  

  logout(): Observable<any> {
    return new Observable(observer => {
      this.http.get(`${this.baseUrl}/logout`, {
        withCredentials: true,
        responseType: 'text'
      }).subscribe({
        next: res => {
          localStorage.removeItem('userName'); 
          this.loggedIn.next(false);
          this.userName.next(null);
          observer.next(res);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }
 
  setUserName(name: string): void {
    this.userName.next(name);
    localStorage.setItem('userName', name); 
  }

  getUserName(): Observable<string | null> {
    return this.userName.asObservable();
  }

  getCurrentUserName(): string | null {
    return this.userName.value;
  }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}


