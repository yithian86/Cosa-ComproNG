import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";

import { AppComponent } from "~/app.component";
import { MyGroceryListsDBService } from "~/components/my-grocery-lists/services/app-my-grocery-lists.database.service";
import { IList } from "~/components/typings/list";


@Component({
  selector: "app-my-grocery-lists",
  templateUrl: "components/my-grocery-lists/views/app-my-grocery-lists.component.html",
  styleUrls: ["components/my-grocery-lists/styles/app-my-grocery-lists.component.css"],
  providers: [MyGroceryListsDBService]
})
export class AppMyGroceryListsComponent extends AppComponent implements OnInit {
  public myLists: Array<IList>;

  constructor(
    private routerExtensions: RouterExtensions,
    private myGroceryListsDBService: MyGroceryListsDBService
  ) {
    super();
  }

  ngOnInit() {
    this.retrieveMyLists();
  }

  public getDate = (date: number) => date > 0 ? new Date(date) : " - "

  public retrieveMyLists = (): void => {
    this.myGroceryListsDBService.getMyLists()
      .then((myListsRes: Array<IList>) => {
        this.myLists = myListsRes ? myListsRes : [];
      })
      .catch(error => console.error(error));
  }

  public goToGroceryListDetails = () => {
    console.log("Navigating to MyGroceryLists...");
    this.routerExtensions.navigate([""], {
      transition: {
        name: "slideRight",
        duration: 300
      }
    });
  }

}