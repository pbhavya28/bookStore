import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  book: any;
  rating: number = 0;
  comment: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe((data) => {
        this.book = data;
      });
    }
  }

  submitRating(): void {
    if (this.rating) {
      this.bookService
        .rateBook(this.book._id, this.rating, this.comment)
        .subscribe(() => {
          this.rating = 0;
          this.comment = '';
          alert('Thank you for your rating!');
        });
    } else {
      alert('Please provide a rating before submitting.');
    }
  }
}
