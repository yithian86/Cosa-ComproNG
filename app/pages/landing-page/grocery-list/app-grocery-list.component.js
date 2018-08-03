"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var database_service_1 = require("~/services/database.service");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var AppGroceryListComponent = /** @class */ (function () {
    function AppGroceryListComponent(databaseService, page, _changeDetectionRef) {
        var _this = this;
        this.databaseService = databaseService;
        this.page = page;
        this._changeDetectionRef = _changeDetectionRef;
        //////////////////////////////////////// GETTERS AND SETTERS ///////////////////////////////////////////
        this.getMyListsNames = function () {
            return !!_this.myLists ? _this.myLists.map(function (list) { return list.listName; }) : [];
        };
        this.getCurrentListName = function () {
            if (_this.myLists && _this.myLists.length > 0) {
                var listNames = _this.getMyListsNames();
                return listNames[_this.selectedListIndex];
            }
            else {
                return "-";
            }
        };
        ///////////////////////////////////////////// SERVICES /////////////////////////////////////////////////
        this.retrieveMyLists = function () {
            _this.databaseService.getMyLists().then(function (myLists) {
                _this.myLists = !!myLists ? myLists : [];
                _this.retrieveGroceryListDetails();
            });
        };
        this.retrieveGroceryListDetails = function () {
            if (!!_this.myLists && _this.myLists.length > 0) {
                var listId = _this.myLists[_this.selectedListIndex].listId;
                _this.databaseService.getGroceryListDetails(listId).then(function (groceryList) { return _this.groceryList = !!groceryList ? groceryList : []; });
            }
        };
        this.updateGroceryList = function (productIndex) {
            var listId = _this.myLists[_this.selectedListIndex].listId;
            var glistId = _this.groceryList[productIndex].id;
            var productId = _this.groceryList[productIndex].productId;
            var quantity = _this.groceryList[productIndex].quantity;
            console.log("Updating element #" + productIndex + ": " + listId + " " + productId + " " + quantity);
            _this.databaseService.updateGroceryListDetails(glistId, listId, productId, quantity);
        };
        this.deleteGroceryListItem = function (productIndex) {
            var glistId = _this.groceryList[productIndex].id;
            console.log("Deleting element #" + productIndex);
            // Update DB
            _this.databaseService.deleteGroceryListItem(glistId);
            // Update list
            _this.groceryList.splice(productIndex, 1);
        };
        ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
        this.isGroceryListEmpty = function () {
            return !_this.groceryList || _this.groceryList.length === 0;
        };
        ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
        this.onItemTap = function (args) {
            console.log(_this.groceryList[args.index].productName + " fa: Muuuu!");
            alert(_this.groceryList[args.index].productName + " fa: Muuuu!");
        };
        this.onListItemTap = function (listName) {
            var myListsNames = _this.getMyListsNames();
            if (listName && myListsNames && myListsNames.length > 0) {
                // Update current list index
                _this.selectedListIndex = myListsNames.indexOf(listName);
                _this.retrieveGroceryListDetails();
                // Close drawer
                _this.closeDrawer();
            }
        };
        this.openAddItemForm = function () {
            if (!!_this.groceryList) {
                _this.showAddItemLayout = true;
            }
        };
        this.addItem = function () {
            _this.groceryList.push({
                barCode: "0123456",
                productName: "Bombolone alla crema"
            });
            _this.showAddItemLayout = false;
            console.log("Added Item");
            alert("Added Item");
        };
        this.switchEditMode = function () {
            console.log("OUCH!");
            _this.isEditMode = !_this.isEditMode;
        };
        this.openDrawer = function () {
            _this.drawer.showDrawer();
        };
        this.closeDrawer = function () {
            _this.drawer.closeDrawer();
        };
        // Init variables
        this.title = "My grocery list";
        this.isEditMode = false;
        this.showAddItemLayout = false;
        this.selectedListIndex = 0;
        this.page.backgroundSpanUnderStatusBar = true;
        // Load grocery lists and selected grocery list details
        this.retrieveMyLists();
    }
    AppGroceryListComponent.prototype.ngOnInit = function () {
    };
    AppGroceryListComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], AppGroceryListComponent.prototype, "drawerComponent", void 0);
    AppGroceryListComponent = __decorate([
        core_1.Component({
            selector: "app-grocery-list",
            templateUrl: "pages/landing-page/grocery-list/app-grocery-list.component.html",
            styleUrls: ["pages/landing-page/grocery-list/app-grocery-list.component.css"]
        }),
        __metadata("design:paramtypes", [database_service_1.DatabaseService,
            page_1.Page,
            core_1.ChangeDetectorRef])
    ], AppGroceryListComponent);
    return AppGroceryListComponent;
}());
exports.AppGroceryListComponent = AppGroceryListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtZ3JvY2VyeS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRjtBQUMvRixzREFBcUQ7QUFDckQsZ0VBQThEO0FBRTlELDhEQUE0RjtBQVE1RjtJQVlFLGlDQUNVLGVBQWdDLEVBQ2pDLElBQVUsRUFDVCxtQkFBc0M7UUFIaEQsaUJBY0M7UUFiUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDakMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNULHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFzQmhELHdHQUF3RztRQUNqRyxvQkFBZSxHQUFHO1lBQ3ZCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFTLElBQUssT0FBQSxJQUFJLENBQUMsUUFBUSxFQUFiLENBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQyxDQUFBO1FBRU0sdUJBQWtCLEdBQUc7WUFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFNLFNBQVMsR0FBa0IsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4RCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2IsQ0FBQztRQUNILENBQUMsQ0FBQTtRQUdELHdHQUF3RztRQUNqRyxvQkFBZSxHQUFHO1lBQ3ZCLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUMs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aUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBRTlDLHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDBDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsaURBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7UUFDOUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUF4QmtDO1FBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7a0NBQXlCLGdDQUFzQjtvRUFBQztJQVZ2RSx1QkFBdUI7UUFMbkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLGlFQUFpRTtZQUM5RSxTQUFTLEVBQUUsQ0FBQyxnRUFBZ0UsQ0FBQztTQUM5RSxDQUFDO3lDQWMyQixrQ0FBZTtZQUMzQixXQUFJO1lBQ1ksd0JBQWlCO09BZnJDLHVCQUF1QixDQThJbkM7SUFBRCw4QkFBQztDQUFBLEFBOUlELElBOElDO0FBOUlZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJhcHAtZ3JvY2VyeS1saXN0XCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbGFuZGluZy1wYWdlL2dyb2NlcnktbGlzdC9hcHAtZ3JvY2VyeS1saXN0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9sYW5kaW5nLXBhZ2UvZ3JvY2VyeS1saXN0L2FwcC1ncm9jZXJ5LWxpc3QuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwR3JvY2VyeUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBpc0VkaXRNb2RlOiBib29sZWFuO1xyXG4gIHB1YmxpYyBteUxpc3RzOiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBncm9jZXJ5TGlzdDogQXJyYXk8YW55PjtcclxuICBwdWJsaWMgc2hvd0FkZEl0ZW1MYXlvdXQ6IGJvb2xlYW47XHJcbiAgcHVibGljIHNlbGVjdGVkTGlzdEluZGV4OiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xyXG5cclxuICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBkYXRhYmFzZVNlcnZpY2U6IERhdGFiYXNlU2VydmljZSxcclxuICAgIHB1YmxpYyBwYWdlOiBQYWdlLFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge1xyXG4gICAgLy8gSW5pdCB2YXJpYWJsZXNcclxuICAgIHRoaXMudGl0bGUgPSBcIk15IGdyb2NlcnkgbGlzdFwiO1xyXG4gICAgdGhpcy5pc0VkaXRNb2RlID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dBZGRJdGVtTGF5b3V0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdEluZGV4ID0gMDtcclxuICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kU3BhblVuZGVyU3RhdHVzQmFyID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBMb2FkIGdyb2NlcnkgbGlzdHMgYW5kIHNlbGVjdGVkIGdyb2NlcnkgbGlzdCBkZXRhaWxzXHJcbiAgICB0aGlzLnJldHJpZXZlTXlMaXN0cygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gR0VUVEVSUyBBTkQgU0VUVEVSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGdldE15TGlzdHNOYW1lcyA9ICgpOiBBcnJheTxzdHJpbmc+ID0+IHtcclxuICAgIHJldHVybiAhIXRoaXMubXlMaXN0cyA/IHRoaXMubXlMaXN0cy5tYXAoKGxpc3Q6IGFueSkgPT4gbGlzdC5saXN0TmFtZSkgOiBbXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDdXJyZW50TGlzdE5hbWUgPSAoKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh0aGlzLm15TGlzdHMgJiYgdGhpcy5teUxpc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgbGlzdE5hbWVzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5nZXRNeUxpc3RzTmFtZXMoKTtcclxuICAgICAgcmV0dXJuIGxpc3ROYW1lc1t0aGlzLnNlbGVjdGVkTGlzdEluZGV4XTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBcIi1cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gU0VSVklDRVMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyByZXRyaWV2ZU15TGlzdHMgPSAoKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLmRhdGFiYXNlU2VydmljZS5nZXRNeUxpc3RzKCkudGhlbigobXlMaXN0czogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMubXlMaXN0cyA9ICEhbXlMaXN0cyA/IG15TGlzdHMgOiBbXTtcclxuXHJcbiAgICAgIHRoaXMucmV0cmlldmVHcm9jZXJ5TGlzdERldGFpbHMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldHJpZXZlR3JvY2VyeUxpc3REZXRhaWxzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKCEhdGhpcy5teUxpc3RzICYmIHRoaXMubXlMaXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGxpc3RJZDogbnVtYmVyID0gdGhpcy5teUxpc3RzW3RoaXMuc2VsZWN0ZWRMaXN0SW5kZXhdLmxpc3RJZDtcclxuICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuZ2V0R3JvY2VyeUxpc3REZXRhaWxzKGxpc3RJZCkudGhlbigoZ3JvY2VyeUxpc3Q6IGFueSkgPT4gdGhpcy5ncm9jZXJ5TGlzdCA9ICEhZ3JvY2VyeUxpc3QgPyBncm9jZXJ5TGlzdCA6IFtdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVHcm9jZXJ5TGlzdCA9IChwcm9kdWN0SW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgbGlzdElkOiBudW1iZXIgPSB0aGlzLm15TGlzdHNbdGhpcy5zZWxlY3RlZExpc3RJbmRleF0ubGlzdElkO1xyXG4gICAgY29uc3QgZ2xpc3RJZDogbnVtYmVyID0gdGhpcy5ncm9jZXJ5TGlzdFtwcm9kdWN0SW5kZXhdLmlkO1xyXG4gICAgY29uc3QgcHJvZHVjdElkOiBudW1iZXIgPSB0aGlzLmdyb2NlcnlMaXN0W3Byb2R1Y3RJbmRleF0ucHJvZHVjdElkO1xyXG4gICAgY29uc3QgcXVhbnRpdHk6IG51bWJlciA9IHRoaXMuZ3JvY2VyeUxpc3RbcHJvZHVjdEluZGV4XS5xdWFudGl0eTtcclxuICAgIGNvbnNvbGUubG9nKGBVcGRhdGluZyBlbGVtZW50ICMke3Byb2R1Y3RJbmRleH06ICR7bGlzdElkfSAke3Byb2R1Y3RJZH0gJHtxdWFudGl0eX1gKTtcclxuICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLnVwZGF0ZUdyb2NlcnlMaXN0RGV0YWlscyhnbGlzdElkLCBsaXN0SWQsIHByb2R1Y3RJZCwgcXVhbnRpdHkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlbGV0ZUdyb2NlcnlMaXN0SXRlbSA9IChwcm9kdWN0SW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgZ2xpc3RJZDogbnVtYmVyID0gdGhpcy5ncm9jZXJ5TGlzdFtwcm9kdWN0SW5kZXhdLmlkO1xyXG4gICAgY29uc29sZS5sb2coYERlbGV0aW5nIGVsZW1lbnQgIyR7cHJvZHVjdEluZGV4fWApO1xyXG4gICAgLy8gVXBkYXRlIERCXHJcbiAgICB0aGlzLmRhdGFiYXNlU2VydmljZS5kZWxldGVHcm9jZXJ5TGlzdEl0ZW0oZ2xpc3RJZCk7XHJcblxyXG4gICAgLy8gVXBkYXRlIGxpc3RcclxuICAgIHRoaXMuZ3JvY2VyeUxpc3Quc3BsaWNlKHByb2R1Y3RJbmRleCwgMSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIENIRUNLRVJTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgaXNHcm9jZXJ5TGlzdEVtcHR5ID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgcmV0dXJuICF0aGlzLmdyb2NlcnlMaXN0IHx8IHRoaXMuZ3JvY2VyeUxpc3QubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEhBTkRMRVJTL0FDVElPTlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIG9uSXRlbVRhcCA9IChhcmdzKTogdm9pZCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmdyb2NlcnlMaXN0W2FyZ3MuaW5kZXhdLnByb2R1Y3ROYW1lfSBmYTogTXV1dXUhYCk7XHJcbiAgICBhbGVydChgJHt0aGlzLmdyb2NlcnlMaXN0W2FyZ3MuaW5kZXhdLnByb2R1Y3ROYW1lfSBmYTogTXV1dXUhYCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25MaXN0SXRlbVRhcCA9IChsaXN0TmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBteUxpc3RzTmFtZXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLmdldE15TGlzdHNOYW1lcygpO1xyXG4gICAgaWYgKGxpc3ROYW1lICYmIG15TGlzdHNOYW1lcyAmJiBteUxpc3RzTmFtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyBVcGRhdGUgY3VycmVudCBsaXN0IGluZGV4XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SW5kZXggPSBteUxpc3RzTmFtZXMuaW5kZXhPZihsaXN0TmFtZSk7XHJcblxyXG4gICAgICB0aGlzLnJldHJpZXZlR3JvY2VyeUxpc3REZXRhaWxzKCk7XHJcblxyXG4gICAgICAvLyBDbG9zZSBkcmF3ZXJcclxuICAgICAgdGhpcy5jbG9zZURyYXdlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9wZW5BZGRJdGVtRm9ybSA9ICgpOiB2b2lkID0+IHtcclxuICAgIGlmICghIXRoaXMuZ3JvY2VyeUxpc3QpIHtcclxuICAgICAgdGhpcy5zaG93QWRkSXRlbUxheW91dCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkSXRlbSA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZ3JvY2VyeUxpc3QucHVzaCh7XHJcbiAgICAgIGJhckNvZGU6IFwiMDEyMzQ1NlwiLFxyXG4gICAgICBwcm9kdWN0TmFtZTogXCJCb21ib2xvbmUgYWxsYSBjcmVtYVwiXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2hvd0FkZEl0ZW1MYXlvdXQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIkFkZGVkIEl0ZW1cIik7XHJcbiAgICBhbGVydChcIkFkZGVkIEl0ZW1cIik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3dpdGNoRWRpdE1vZGUgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk9VQ0ghXCIpO1xyXG4gICAgdGhpcy5pc0VkaXRNb2RlID0gIXRoaXMuaXNFZGl0TW9kZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvcGVuRHJhd2VyID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsb3NlRHJhd2VyID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcclxuICB9XHJcbn1cclxuIl19