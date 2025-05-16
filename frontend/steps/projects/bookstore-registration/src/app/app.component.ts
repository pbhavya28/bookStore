import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  template: `
    <app-book-register></app-book-register>
    <!-- <router-outlet></router-outlet> -->
  `,
  standalone: false,
  styles: []
})
export class AppComponent {
  title = 'bookstore-registration';
}
