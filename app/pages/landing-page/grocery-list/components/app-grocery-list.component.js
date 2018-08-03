"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var side_drawer_directives_1 = require("nativescript-ui-sidedrawer/angular/side-drawer-directives");
var app_grocery_list_database_service_1 = require("~/pages/landing-page/grocery-list/services/app-grocery-list.database.service");
var AppGroceryListComponent = /** @class */ (function () {
    function AppGroceryListComponent(databaseService, _changeDetectionRef, page) {
        var _this = this;
        this.databaseService = databaseService;
        this._changeDetectionRef = _changeDetectionRef;
        this.page = page;
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
        core_1.ViewChild(side_drawer_directives_1.RadSideDrawerComponent),
        __metadata("design:type", side_drawer_directives_1.RadSideDrawerComponent)
    ], AppGroceryListComponent.prototype, "drawerComponent", void 0);
    AppGroceryListComponent = __decorate([
        core_1.Component({
            selector: "app-grocery-list",
            templateUrl: "pages/landing-page/grocery-list/views/app-grocery-list.component.html",
            styleUrls: ["pages/landing-page/grocery-list/styles/app-grocery-list.component.css"],
            providers: [app_grocery_list_database_service_1.GroceryListDatabaseService]
        }),
        __metadata("design:paramtypes", [app_grocery_list_database_service_1.GroceryListDatabaseService,
            core_1.ChangeDetectorRef,
            page_1.Page])
    ], AppGroceryListComponent);
    return AppGroceryListComponent;
}());
exports.AppGroceryListComponent = AppGroceryListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtZ3JvY2VyeS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRjtBQUMvRixzREFBcUQ7QUFFckQsb0dBQW1IO0FBR25ILGtJQUEwSDtBQVExSDtJQVlFLGlDQUNVLGVBQTJDLEVBQzNDLG1CQUFzQyxFQUN2QyxJQUFVO1FBSG5CLGlCQWNDO1FBYlMsb0JBQWUsR0FBZixlQUFlLENBQTRCO1FBQzNDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDdkMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQXNCbkIsd0dBQXdHO1FBQ2pHLG9CQUFlLEdBQUc7WUFDdkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsQ0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDLENBQUE7UUFFTSx1QkFBa0IsR0FBRztZQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLElBQU0sU0FBUyxHQUFrQixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDM0MsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDYixDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBR0Qsd0dBQXdHO1FBQ2pHLG9CQUFlLEdBQUc7WUFDdkIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FB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QyxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUM7UUFFOUMsdURBQXVEO1FBQ3ZELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsMENBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCxpREFBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUM5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQXhCa0M7UUFBbEMsZ0JBQVMsQ0FBQywrQ0FBc0IsQ0FBQztrQ0FBeUIsK0NBQXNCO29FQUFDO0lBVnZFLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsdUVBQXVFO1lBQ3BGLFNBQVMsRUFBRSxDQUFDLHVFQUF1RSxDQUFDO1lBQ3BGLFNBQVMsRUFBRSxDQUFDLDhEQUEwQixDQUFDO1NBQ3hDLENBQUM7eUNBYzJCLDhEQUEwQjtZQUN0Qix3QkFBaUI7WUFDakMsV0FBSTtPQWZSLHVCQUF1QixDQThJbkM7SUFBRCw4QkFBQztDQUFBLEFBOUlELElBOElDO0FBOUlZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xyXG5cclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhci9zaWRlLWRyYXdlci1kaXJlY3RpdmVzXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XHJcblxyXG5pbXBvcnQgeyBHcm9jZXJ5TGlzdERhdGFiYXNlU2VydmljZSB9IGZyb20gXCJ+L3BhZ2VzL2xhbmRpbmctcGFnZS9ncm9jZXJ5LWxpc3Qvc2VydmljZXMvYXBwLWdyb2NlcnktbGlzdC5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJhcHAtZ3JvY2VyeS1saXN0XCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbGFuZGluZy1wYWdlL2dyb2NlcnktbGlzdC92aWV3cy9hcHAtZ3JvY2VyeS1saXN0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9sYW5kaW5nLXBhZ2UvZ3JvY2VyeS1saXN0L3N0eWxlcy9hcHAtZ3JvY2VyeS1saXN0LmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgcHJvdmlkZXJzOiBbR3JvY2VyeUxpc3REYXRhYmFzZVNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBHcm9jZXJ5TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XHJcbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgcHVibGljIGlzRWRpdE1vZGU6IGJvb2xlYW47XHJcbiAgcHVibGljIG15TGlzdHM6IEFycmF5PGFueT47XHJcbiAgcHVibGljIGdyb2NlcnlMaXN0OiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBzaG93QWRkSXRlbUxheW91dDogYm9vbGVhbjtcclxuICBwdWJsaWMgc2VsZWN0ZWRMaXN0SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgcHJpdmF0ZSBkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XHJcblxyXG4gIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlU2VydmljZTogR3JvY2VyeUxpc3REYXRhYmFzZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHVibGljIHBhZ2U6IFBhZ2VcclxuICApIHtcclxuICAgIC8vIEluaXQgdmFyaWFibGVzXHJcbiAgICB0aGlzLnRpdGxlID0gXCJNeSBncm9jZXJ5IGxpc3RcIjtcclxuICAgIHRoaXMuaXNFZGl0TW9kZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93QWRkSXRlbUxheW91dCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RJbmRleCA9IDA7XHJcbiAgICB0aGlzLnBhZ2UuYmFja2dyb3VuZFNwYW5VbmRlclN0YXR1c0JhciA9IHRydWU7XHJcblxyXG4gICAgLy8gTG9hZCBncm9jZXJ5IGxpc3RzIGFuZCBzZWxlY3RlZCBncm9jZXJ5IGxpc3QgZGV0YWlsc1xyXG4gICAgdGhpcy5yZXRyaWV2ZU15TGlzdHMoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEdFVFRFUlMgQU5EIFNFVFRFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBnZXRNeUxpc3RzTmFtZXMgPSAoKTogQXJyYXk8c3RyaW5nPiA9PiB7XHJcbiAgICByZXR1cm4gISF0aGlzLm15TGlzdHMgPyB0aGlzLm15TGlzdHMubWFwKChsaXN0OiBhbnkpID0+IGxpc3QubGlzdE5hbWUpIDogW107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q3VycmVudExpc3ROYW1lID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAodGhpcy5teUxpc3RzICYmIHRoaXMubXlMaXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGxpc3ROYW1lczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuZ2V0TXlMaXN0c05hbWVzKCk7XHJcbiAgICAgIHJldHVybiBsaXN0TmFtZXNbdGhpcy5zZWxlY3RlZExpc3RJbmRleF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFNFUlZJQ0VTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgcmV0cmlldmVNeUxpc3RzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuZ2V0TXlMaXN0cygpLnRoZW4oKG15TGlzdHM6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLm15TGlzdHMgPSAhIW15TGlzdHMgPyBteUxpc3RzIDogW107XHJcblxyXG4gICAgICB0aGlzLnJldHJpZXZlR3JvY2VyeUxpc3REZXRhaWxzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXRyaWV2ZUdyb2NlcnlMaXN0RGV0YWlscyA9ICgpOiB2b2lkID0+IHtcclxuICAgIGlmICghIXRoaXMubXlMaXN0cyAmJiB0aGlzLm15TGlzdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBsaXN0SWQ6IG51bWJlciA9IHRoaXMubXlMaXN0c1t0aGlzLnNlbGVjdGVkTGlzdEluZGV4XS5saXN0SWQ7XHJcbiAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLmdldEdyb2NlcnlMaXN0RGV0YWlscyhsaXN0SWQpLnRoZW4oKGdyb2NlcnlMaXN0OiBhbnkpID0+IHRoaXMuZ3JvY2VyeUxpc3QgPSAhIWdyb2NlcnlMaXN0ID8gZ3JvY2VyeUxpc3QgOiBbXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlR3JvY2VyeUxpc3QgPSAocHJvZHVjdEluZGV4OiBudW1iZXIpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGxpc3RJZDogbnVtYmVyID0gdGhpcy5teUxpc3RzW3RoaXMuc2VsZWN0ZWRMaXN0SW5kZXhdLmxpc3RJZDtcclxuICAgIGNvbnN0IGdsaXN0SWQ6IG51bWJlciA9IHRoaXMuZ3JvY2VyeUxpc3RbcHJvZHVjdEluZGV4XS5pZDtcclxuICAgIGNvbnN0IHByb2R1Y3RJZDogbnVtYmVyID0gdGhpcy5ncm9jZXJ5TGlzdFtwcm9kdWN0SW5kZXhdLnByb2R1Y3RJZDtcclxuICAgIGNvbnN0IHF1YW50aXR5OiBudW1iZXIgPSB0aGlzLmdyb2NlcnlMaXN0W3Byb2R1Y3RJbmRleF0ucXVhbnRpdHk7XHJcbiAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgZWxlbWVudCAjJHtwcm9kdWN0SW5kZXh9OiAke2xpc3RJZH0gJHtwcm9kdWN0SWR9ICR7cXVhbnRpdHl9YCk7XHJcbiAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVHcm9jZXJ5TGlzdERldGFpbHMoZ2xpc3RJZCwgbGlzdElkLCBwcm9kdWN0SWQsIHF1YW50aXR5KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZWxldGVHcm9jZXJ5TGlzdEl0ZW0gPSAocHJvZHVjdEluZGV4OiBudW1iZXIpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGdsaXN0SWQ6IG51bWJlciA9IHRoaXMuZ3JvY2VyeUxpc3RbcHJvZHVjdEluZGV4XS5pZDtcclxuICAgIGNvbnNvbGUubG9nKGBEZWxldGluZyBlbGVtZW50ICMke3Byb2R1Y3RJbmRleH1gKTtcclxuICAgIC8vIFVwZGF0ZSBEQlxyXG4gICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuZGVsZXRlR3JvY2VyeUxpc3RJdGVtKGdsaXN0SWQpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBsaXN0XHJcbiAgICB0aGlzLmdyb2NlcnlMaXN0LnNwbGljZShwcm9kdWN0SW5kZXgsIDEpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBDSEVDS0VSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGlzR3JvY2VyeUxpc3RFbXB0eSA9ICgpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiAhdGhpcy5ncm9jZXJ5TGlzdCB8fCB0aGlzLmdyb2NlcnlMaXN0Lmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBIQU5ETEVSUy9BQ1RJT05TIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBvbkl0ZW1UYXAgPSAoYXJncyk6IHZvaWQgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYCR7dGhpcy5ncm9jZXJ5TGlzdFthcmdzLmluZGV4XS5wcm9kdWN0TmFtZX0gZmE6IE11dXV1IWApO1xyXG4gICAgYWxlcnQoYCR7dGhpcy5ncm9jZXJ5TGlzdFthcmdzLmluZGV4XS5wcm9kdWN0TmFtZX0gZmE6IE11dXV1IWApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uTGlzdEl0ZW1UYXAgPSAobGlzdE5hbWU6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgbXlMaXN0c05hbWVzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5nZXRNeUxpc3RzTmFtZXMoKTtcclxuICAgIGlmIChsaXN0TmFtZSAmJiBteUxpc3RzTmFtZXMgJiYgbXlMaXN0c05hbWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gVXBkYXRlIGN1cnJlbnQgbGlzdCBpbmRleFxyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEluZGV4ID0gbXlMaXN0c05hbWVzLmluZGV4T2YobGlzdE5hbWUpO1xyXG5cclxuICAgICAgdGhpcy5yZXRyaWV2ZUdyb2NlcnlMaXN0RGV0YWlscygpO1xyXG5cclxuICAgICAgLy8gQ2xvc2UgZHJhd2VyXHJcbiAgICAgIHRoaXMuY2xvc2VEcmF3ZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvcGVuQWRkSXRlbUZvcm0gPSAoKTogdm9pZCA9PiB7XHJcbiAgICBpZiAoISF0aGlzLmdyb2NlcnlMaXN0KSB7XHJcbiAgICAgIHRoaXMuc2hvd0FkZEl0ZW1MYXlvdXQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEl0ZW0gPSAoKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLmdyb2NlcnlMaXN0LnB1c2goe1xyXG4gICAgICBiYXJDb2RlOiBcIjAxMjM0NTZcIixcclxuICAgICAgcHJvZHVjdE5hbWU6IFwiQm9tYm9sb25lIGFsbGEgY3JlbWFcIlxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNob3dBZGRJdGVtTGF5b3V0ID0gZmFsc2U7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJBZGRlZCBJdGVtXCIpO1xyXG4gICAgYWxlcnQoXCJBZGRlZCBJdGVtXCIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN3aXRjaEVkaXRNb2RlID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJPVUNIIVwiKTtcclxuICAgIHRoaXMuaXNFZGl0TW9kZSA9ICF0aGlzLmlzRWRpdE1vZGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3BlbkRyYXdlciA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9zZURyYXdlciA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==