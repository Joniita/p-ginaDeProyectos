import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title: String;
  public subtitle: String;
  public email: String


  constructor() {
    this.title = "Jonathan Piriz";
    this.subtitle = "Desarrollador FullStack";
    this.email = "joniita.d@gmail.com";
   }

  ngOnInit(): void {
  }

}
