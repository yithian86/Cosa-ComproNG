import { Component } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
  selector: "app-root",
  templateUrl: "./app.html"
})
export class AppComponent {

  constructor(private page: Page) {
    // page.actionBarHidden = true;
  }
}
