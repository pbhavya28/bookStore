// import { Component } from "@angular/core";

// @Component({
//     standalone: false,
//     selector: 'app-home-comp',
//     templateUrl: `./home.component.html`,
//     styleUrls: ['./home.component.css'],


// })

// export class HomeComponent{
//   title = "Home page"
// }
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Adjust path as needed
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-home-comp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = "Home page";

  constructor(private authService: AuthService, private router: Router) {}

  logoutUser() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: err => console.error('Logout failed', err)
    });
  }
  
}
