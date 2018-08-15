import { Component, AfterViewInit, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";
import { action } from "ui/dialogs";

import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import { GroceryListDetailsDBService } from "~/components/grocery-list-details/services/app-grocery-list.database.service";
import { MyGroceryListsDBService } from "~/components/my-grocery-lists/services/app-my-grocery-lists.database.service";


@Component({
  selector: "app-grocery-list-details",
  templateUrl: "components/grocery-list-details/views/app-grocery-list-details.component.html",
  styleUrls: ["components/grocery-list-details/styles/app-grocery-list-details.component.css"],
  providers: [GroceryListDetailsDBService, MyGroceryListsDBService]
})
export class AppGroceryListDetailsComponent implements AfterViewInit, OnInit {
  public title: string;
  public isEditing: boolean;
  public myLists: Array<any>;
  public groceryList: Array<any>;
  public selectedListIndex: number;

  private drawer: RadSideDrawer;

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

  constructor(
    private groceryListDetailsDBService: GroceryListDetailsDBService,
    private myGroceryListsDBService: MyGroceryListsDBService,
    private _changeDetectionRef: ChangeDetectorRef,
    private routerExtensions: RouterExtensions,
    public page: Page
  ) {
    // Init variables
    this.title = "My grocery list";
    this.isEditing = false;
    this.selectedListIndex = 0;

    // Load grocery lists and selected grocery list details
    this.retrieveMyLists();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
    this._changeDetectionRef.detectChanges();
  }


  //////////////////////////////////////// GETTERS AND SETTERS ///////////////////////////////////////////
  public getMyListsNames = (): Array<string> => {
    return !!this.myLists ? this.myLists.map((list: any) => list.listName) : [];
  }

  public getCurrentListName = (): string => {
    if (this.myLists && this.myLists.length > 0) {
      const listNames: Array<string> = this.getMyListsNames();
      return listNames[this.selectedListIndex];
    } else {
      return "-";
    }
  }


  ///////////////////////////////////////////// SERVICES /////////////////////////////////////////////////
  public retrieveMyLists = (): void => {
    this.myGroceryListsDBService.getMyLists().then((myLists: any) => {
      this.myLists = !!myLists ? myLists : [];

      this.retrieveGroceryListDetails();
    });
  }

  public retrieveGroceryListDetails = (): void => {
    if (!!this.myLists && this.myLists.length > 0) {
      const listId: number = this.myLists[this.selectedListIndex].listId;
      this.groceryListDetailsDBService.getGroceryListDetails(listId).then((groceryList: any) => this.groceryList = !!groceryList ? groceryList : []);
    }
  }

  public updateGroceryList = (productIndex: number): void => {
    const listId: number = this.myLists[this.selectedListIndex].listId;
    const glistId: number = this.groceryList[productIndex].id;
    const productId: number = this.groceryList[productIndex].productId;
    const quantity: number = this.groceryList[productIndex].quantity;
    console.log(`Updating element #${productIndex}: ${listId} ${productId} ${quantity}`);
    this.groceryListDetailsDBService.updateGroceryListDetails(glistId, listId, productId, quantity);
  }

  public deleteGroceryListItem = (productIndex: number): void => {
    const glistId: number = this.groceryList[productIndex].id;
    console.log(`Deleting element #${productIndex}`);
    // Update DB
    this.groceryListDetailsDBService.deleteGroceryListItem(glistId);

    // Update list
    this.groceryList.splice(productIndex, 1);
  }


  ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
  public isGroceryListEmpty = (): boolean => {
    return !this.groceryList || this.groceryList.length === 0;
  }


  ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
  public switchEditMode = (): void => {
    this.isEditing = !this.isEditing;
  }

  public showMyListsDialog = () => {
    const myListsNames: Array<string> = this.getMyListsNames();

    let options = {
      title: "Choose grocery list:",
      message: "",
      cancelButtonText: "Cancel",
      actions: myListsNames
    };

    action(options).then((selectedListName) => {
      if (selectedListName && selectedListName !== "Cancel" && myListsNames && myListsNames.length > 0) {
        // Update current list index
        this.selectedListIndex = myListsNames.indexOf(selectedListName);

        this.retrieveGroceryListDetails();
      }
    });
  }

  public openDrawer = (): void => {
    this.drawer.showDrawer();
  }

  public closeDrawer = (): void => {
    this.drawer.closeDrawer();
  }

  public goToGroceryListForm = (): void => {
    console.log("Navigating to Product List...");
    this.routerExtensions.navigate(["/home/productList/list"], {
      transition: {
        name: "slideLeft",
        duration: 300
      }
    });
  }
}
