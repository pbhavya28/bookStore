import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  book: Book | null = null;
  rating: number = 0;
  comment: string = '';
  avgRating: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe(data => {
        this.book = data;
        this.calculateAvgRating();
      });
    }
  }

  calculateAvgRating(): void {
    if (this.book?.ratings && this.book.ratings.length > 0) {
      const total = this.book.ratings.reduce((sum, r) => sum + r, 0);
      this.avgRating = total / this.book.ratings.length;
    } else {
      this.avgRating = null;
    }
  }

  submitRating(): void {
    if (this.rating > 0 && this.book) {
      this.bookService
        .rateBook(this.book._id!, this.rating, this.comment)
        .subscribe(() => {
          // Update local state for immediate UI feedback
          this.book!.ratings = this.book!.ratings || [];
          this.book!.ratings.push(this.rating);
          this.book!.feedback = this.book!.feedback || [];
          if (this.comment.trim()) {
            this.book!.feedback.push(this.comment.trim());
          }

          this.calculateAvgRating();

          // Reset form
          this.rating = 0;
          this.comment = '';
          alert('Thank you for your rating!');
        });
    } else {
      alert('Please provide a rating before submitting.');
    }
  }

  download(): void {
    if (this.book?.downloadLink) {
      this.bookService.downloadBook(this.book.downloadLink);
    }
  }
}
