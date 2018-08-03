import { Component, AfterViewInit, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";

// import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
// import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import { MyGroceryListsDBService } from "~/components/my-grocery-lists/services/app-my-grocery-lists.database.service";


@Component({
  selector: "app-my-grocery-lists",
  templateUrl: "components/my-grocery-lists/views/app-my-grocery-lists.component.html",
  styleUrls: ["components/my-grocery-lists/styles/app-my-grocery-lists.component.css"],
  providers: [MyGroceryListsDBService]
})
export class AppMyGroceryListsComponent implements AfterViewInit, OnInit {

  constructor(
    private _changeDetectionRef: ChangeDetectorRef,
    private routerExtensions: RouterExtensions,
    public page: Page
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._changeDetectionRef.detectChanges();
  }

  public addItem = (): void => {
    // this.groceryList.push({
    //   barCode: "0123456",
    //   productName: "Bombolone alla crema"
    // });

    console.log("Added Item");
    alert("Added Item");
  }
  
  public goToGroceryListDetails = () => {
    console.log("Navigating to MyGroceryLists...");
    this.routerExtensions.navigate(["/home/groceryListDetails"], {
      transition: {
        name: "slideRight",
        duration: 300
      }
    });
  }

}