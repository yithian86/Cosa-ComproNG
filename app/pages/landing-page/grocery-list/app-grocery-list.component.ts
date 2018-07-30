import { Component, AfterViewInit, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { DatabaseService } from "~/services/database.service";

import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
  selector: "app-grocery-list",
  templateUrl: "pages/landing-page/grocery-list/app-grocery-list.component.html",
  styleUrls: ["pages/landing-page/grocery-list/app-grocery-list.component.css"]
})
export class AppGroceryListComponent implements AfterViewInit, OnInit {
  public title: string;
  public myLists: Array<any>;
  public groceryList: Array<any>;
  public showAddItemLayout: boolean;
  public selectedListIndex: number;

  private drawer: RadSideDrawer;
  private _mainContentText: string;

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

  constructor(
    private databaseService: DatabaseService,
    public page: Page,
    private _changeDetectionRef: ChangeDetectorRef
  ) {
    // Init variables
    this.title = "My grocery list";
    this.showAddItemLayout = false;
    this.selectedListIndex = 0;
    this.page.backgroundSpanUnderStatusBar = true;

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
  public retrieveMyLists = () => {
    this.databaseService.getMyLists().then((myLists: any) => {
      this.myLists = !!myLists ? myLists : [];

      this.retrieveGroceryListDetails();
    });
  }

  public retrieveGroceryListDetails = () => {
    if (!!this.myLists && this.myLists.length > 0) {
      const listId: number = this.myLists[this.selectedListIndex].listId;
      this.databaseService.getGroceryListDetails(listId).then((groceryList: any) => this.groceryList = !!groceryList ? groceryList : []);
    }
  }


  ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
  public isGroceryListEmpty() {
    return !this.groceryList || this.groceryList.length === 0;
  }


  ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
  public onItemTap(args) {
    console.log(`${this.groceryList[args.index].productName} fa: Muuuu!`);
    alert(`${this.groceryList[args.index].productName} fa: Muuuu!`);
  }

  public onListItemTap = (listName: string) => {
    const myListsNames: Array<string> = this.getMyListsNames();
    if (listName && myListsNames && myListsNames.length > 0) {
      // Update current list index
      this.selectedListIndex = myListsNames.indexOf(listName);

      this.retrieveGroceryListDetails();

      // Close drawer
      this.closeDrawer();
    }
  }

  public openAddItemForm() {
    if (!this.isGroceryListEmpty()) {
      this.showAddItemLayout = true;
    }
  }

  public addItem() {
    this.groceryList.push({
      barCode: "0123456",
      productName: "Bombolone alla crema"
    });
    this.showAddItemLayout = false;

    console.log("Added Item");
    alert("Added Item");
  }

  public openDrawer() {
    this.drawer.showDrawer();
  }

  public closeDrawer() {
    this.drawer.closeDrawer();
  }
}
