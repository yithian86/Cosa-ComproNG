import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";

@Component({
  selector: "app-grocery-list-form",
  templateUrl: "components/grocery-list-details/views/app-grocery-list-form.component.html",
  styleUrls: ["components/grocery-list-details/styles/app-grocery-list-form.component.css"],
  providers: []
})
export class AppGroceryListFormComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) { }

  ngOnInit() { }

  public goToGroceryListDetails = () => {
    console.log("Navigating to MyGroceryLists...");
    this.routerExtensions.navigate(["/home/groceryList/groceryListDetails"], {
      transition: {
        name: "slideRight",
        duration: 300
      }
    });
  }
}