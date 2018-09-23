import { Component } from "@angular/core";
import * as Toast from 'nativescript-toast';

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
      console.error("##############################################################");
      console.error(message);
      console.error("##############################################################");
    } else {
      console.log("##############################################################");
      console.log(message);
      console.log("##############################################################");
    }

    Toast.makeText(message).show();
  }
}
