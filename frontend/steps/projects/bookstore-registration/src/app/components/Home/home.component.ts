import { Component } from "@angular/core";

@Component({
    standalone: false,
    selector: 'app-home-comp',
    templateUrl: `./home.component.html`,
    styleUrls: ['./home.component.css'],


})

export class HomeComponent{
  title = "Home page"
}