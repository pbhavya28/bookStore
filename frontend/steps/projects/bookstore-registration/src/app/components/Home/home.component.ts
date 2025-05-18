
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';  

@Component({
  standalone: false,
  selector: 'app-home-comp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Book[] = [];           
  filteredBooks: Book[] = [];    
  userState: boolean = false;
  userName: string | null = null;

  // Store top categories based on tags
  topCategories: string[] = [];
  selectedCategory: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.fetchBooks();

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
      this.filteredBooks = this.books;  
      this.calculateTopCategories();   
    });
  }
  handleShowDetails(bookId: number): void {
    if (this.userState) {
      this.router.navigate(['/detail', bookId]);
    } else {
      alert('Please log in first to view book details.');
    }
  }
  trackByBookId(index: number, book: any): string {
    return book._id;
  }
  

  calculateTopCategories(): void {
    const allTags = this.books.flatMap(book => book.tags);

    const tagCount: { [key: string]: number } = {};
    allTags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });

    this.topCategories = Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])  
      .slice(0, 4)                  
      .map(entry => entry[0]);       
  }

 
  filterByCategory(category: string): void {
    if (category === '') {
      this.filteredBooks = this.books;  
    } else {
      this.filteredBooks = this.books.filter(book => book.tags.includes(category));
    }
    this.selectedCategory = category;  
  }

  logoutUser(): void {
    alert("You are Logged Out");
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: err => console.error('Logout failed', err)
    });
  }
}

