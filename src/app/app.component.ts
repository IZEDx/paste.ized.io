import { Component } from "@angular/core";

import "../style/app.sass";

@Component({
  selector: "my-app", // <my-app></my-app>
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  constructor(public title : string) {
  }
}