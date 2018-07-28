import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { DatabaseService } from "~/services/database.service";

@Component({
  selector: "app-grocery-list",
  templateUrl: "pages/landing-page/grocery-list/app-grocery-list.component.html",
  styleUrls: ["pages/landing-page/grocery-list/app-grocery-list.component.css"]
})
export class AppGroceryListComponent implements OnInit {
  public title: string;
  public myLists: Array<any>;
  public groceryList: Array<any>;
  public showAddItemLayout: boolean;
  public myListsSelectedIndex: number;

  constructor(private databaseService: DatabaseService, public page: Page) {
    // Init variables
    this.title = "My grocery list";
    this.showAddItemLayout = false;
    this.myListsSelectedIndex = 0;
    this.page.backgroundSpanUnderStatusBar = true;

    // Load data
    this.retrieveMyLists();
    this.retrieveGroceryList();
  }

  ngOnInit() {
  }

  
  ///////////////////////////////////////////// GETTERS /////////////////////////////////////////////////
  public getMyListsForPicker = () => {
    return !!this.myLists ? this.myLists.map((list: any) => list.listName) : [];
  }

  
  ///////////////////////////////////////////// SERVICES /////////////////////////////////////////////////
  public retrieveMyLists = () => {
    this.databaseService.getMyLists().then((myLists: any) => this.myLists = !!myLists ? myLists : []);
  }

  public retrieveGroceryList = () => {
    if (!!this.myLists && this.myLists.length > 0) {
      const listId: number = this.myLists[this.myListsSelectedIndex].listId;
      this.databaseService.getGroceryList(listId).then((groceryList: any) => this.groceryList = !!groceryList ? groceryList : []);
    }
  }

  
  ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
  public isGroceryListEmpty() {
    return !this.groceryList;
  }

  
  ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
  public onItemTap(args) {
    console.log(`${this.groceryList[args.index].productName} fa: Muuuu!`);
    alert(`${this.groceryList[args.index].productName} fa: Muuuu!`);
  }

  public onSelectedIndexChange = (picker: any) => {
    if (!!picker) {
      // Update ListPicker index
      this.myListsSelectedIndex = picker.selectedIndex;
    }

    this.retrieveGroceryList();
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
}
