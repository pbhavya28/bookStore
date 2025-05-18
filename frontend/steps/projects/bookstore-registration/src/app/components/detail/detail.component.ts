import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';

interface Book {
  _id: string;
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
  edition: string;
  isbn: string;
  language: string;
  pages: number;
  price: number;
  currency: string;
  category: string;
  description: string;
  coverImage: string;
  downloadLink: string;
  ratings: number[]; // Array of ratings
  feedback: Array<any>;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  standalone: false,
})
export class DetailComponent implements OnInit {
  book: Book | null = null;
  rating: number = 0;
  comment: string = '';
  loading: boolean = true;
  averageRating: number = 0; 
  

  userState: boolean = false;
  userName: string = '';
  relatedBooks: any[] = [];

  constructor(
     private authService: AuthService,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = localStorage.getItem('userName');
    if (username) {
      this.userState = true;
      this.userName = username;
    } else {
      this.userState = false;
    }
    this.route.paramMap.subscribe((params) => {
      const bookId = params.get('id'); 
      if (bookId) {
        this.fetchBookDetails(bookId); 
        this.fetchRelatedBooks(bookId);
      }
    });

    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe({
        next: (data) => {
          this.book = data;
          this.calculateAverageRating(); 
          this.fetchRelatedBooks(bookId);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching book details:', err);
          this.loading = false;
          this.book = null;
        },
      });
    }
  }
  fetchRelatedBooks(bookId: string): void {
    this.bookService.getRelatedBooks(bookId).subscribe({
      next: (books) => {
        this.relatedBooks = books;
      },
      error: (err) => {
        console.error('Error fetching related books:', err);
        alert('Failed to fetch related books. Please try again later.');
      },
    });
  }

  fetchBookDetails(bookId: string): void {
    this.loading = true; 
    this.bookService.getBookById(bookId).subscribe({
      next: (data) => {
        this.book = data;
        this.calculateAverageRating(); 
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching book details:', err);
        this.loading = false;
        this.book = null;
      },
    });
  }

  calculateAverageRating(): void {
    if (this.book && this.book.ratings && this.book.ratings.length > 0) {
      const totalRatings = this.book.ratings.reduce((sum, rating) => sum + rating, 0);
      this.averageRating = totalRatings / this.book.ratings.length;
    } else {
      this.averageRating = 0; 
    }
  }
  
    parseFeedback(feedback: string): { username: string; rating: number; comment: string } {
    try {
      return JSON.parse(feedback);
    } catch (error) {
      console.error('Error parsing feedback:', error);
      return { username: 'Unknown', rating: 0, comment: 'Invalid feedback format' };
    }
  }

  setRating(rating: number): void {
    this.rating = rating;
  }

  // logoutUser(): void {
  //   localStorage.clear();
  //   this.userState = false;
  //   this.userName = '';
  //   this.router.navigate(['/home']);
  // }
  logoutUser(): void {
    alert("You are Logged Out");
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: err => console.error('Logout failed', err)
    });
  }

  submitRating(): void {
    if (!this.book) {
      alert('Book details are not loaded. Unable to submit rating.');
      return;
    }

    if (this.rating < 1 || this.rating > 5) {
      alert('Please provide a rating between 1 and 5.');
      return;
    }

    if (!this.comment.trim()) {
      alert('Please provide a comment.');
      return;
    }

    const username = localStorage.getItem('userName') || 'Anonymous';
    const payload = { rating: this.rating, comment: this.comment };

    this.bookService.rateBook(this.book._id, payload, username).subscribe({
      next: (updatedBook) => {
        
        this.book = updatedBook;
        this.calculateAverageRating();
        this.rating = 0;
        this.comment = '';
        alert('Thank you for your rating!');
      },
      error: (err) => {
        console.error('Error submitting rating:', err);
        alert('Failed to submit your rating. Please try again.');
      },
    });
  }
}