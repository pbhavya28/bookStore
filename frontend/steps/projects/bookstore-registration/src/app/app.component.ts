import { Component } from "@angular/core";

@Component({
  selector: 'app-root',

  template: `
    <!-- <app-detail></app-detail> -->
    <router-outlet></router-outlet>
  `,
  standalone: false,
  styles: []
})
export class AppComponent {
  title = 'bookstore-registration';
}

