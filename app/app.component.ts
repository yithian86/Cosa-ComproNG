import { Component } from "@angular/core";
import * as Toast from 'nativescript-toast';
import { Page } from "tns-core-modules/ui/page/page";

@Component({
  selector: "app-root",
  templateUrl: "./app.html"
})
export class AppComponent {

  constructor() {
    // page.actionBarHidden = true;
  }

  public displayMessage = (message: string, type?: string) => {
    if (type === "error") {
      console.error(message);
    } else {
      console.log(message);
    }

    Toast.makeText(message).show();
  }
}
