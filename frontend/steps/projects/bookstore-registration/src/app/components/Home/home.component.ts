import { Component } from "@angular/core";

@Component({
    selector: 'app-home-comp',
    standalone: false,
    templateUrl: `./home.component.html`,
    styleUrls: ['./home.component.css'],

})

export class HomeComponent{
  title = "Home page"
}
