"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var side_drawer_directives_1 = require("nativescript-ui-sidedrawer/angular/side-drawer-directives");
var app_grocery_list_database_service_1 = require("~/components/grocery-list-details/services/app-grocery-list.database.service");
var app_my_grocery_lists_database_service_1 = require("~/components/my-grocery-lists/services/app-my-grocery-lists.database.service");
var AppGroceryListDetailsComponent = /** @class */ (function () {
    function AppGroceryListDetailsComponent(groceryListDetailsDBService, myGroceryListsDBService, _changeDetectionRef, routerExtensions, page) {
        var _this = this;
        this.groceryListDetailsDBService = groceryListDetailsDBService;
        this.myGroceryListsDBService = myGroceryListsDBService;
        this._changeDetectionRef = _changeDetectionRef;
        this.routerExtensions = routerExtensions;
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
            _this.myGroceryListsDBService.getMyLists().then(function (myLists) {
                _this.myLists = !!myLists ? myLists : [];
                _this.retrieveGroceryListDetails();
            });
        };
        this.retrieveGroceryListDetails = function () {
            if (!!_this.myLists && _this.myLists.length > 0) {
                var listId = _this.myLists[_this.selectedListIndex].listId;
                _this.groceryListDetailsDBService.getGroceryListDetails(listId).then(function (groceryList) { return _this.groceryList = !!groceryList ? groceryList : []; });
            }
        };
        this.updateGroceryList = function (productIndex) {
            var listId = _this.myLists[_this.selectedListIndex].listId;
            var glistId = _this.groceryList[productIndex].id;
            var productId = _this.groceryList[productIndex].productId;
            var quantity = _this.groceryList[productIndex].quantity;
            console.log("Updating element #" + productIndex + ": " + listId + " " + productId + " " + quantity);
            _this.groceryListDetailsDBService.updateGroceryListDetails(glistId, listId, productId, quantity);
        };
        this.deleteGroceryListItem = function (productIndex) {
            var glistId = _this.groceryList[productIndex].id;
            console.log("Deleting element #" + productIndex);
            // Update DB
            _this.groceryListDetailsDBService.deleteGroceryListItem(glistId);
            // Update list
            _this.groceryList.splice(productIndex, 1);
        };
        ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
        this.isGroceryListEmpty = function () {
            return !_this.groceryList || _this.groceryList.length === 0;
        };
        ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
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
        this.switchEditMode = function () {
            _this.isEditing = !_this.isEditing;
        };
        this.openDrawer = function () {
            _this.drawer.showDrawer();
        };
        this.closeDrawer = function () {
            _this.drawer.closeDrawer();
        };
        this.goToGroceryListForm = function () {
            console.log("Navigating to Product List...");
            _this.routerExtensions.navigate(["/home/productList/list"], {
                transition: {
                    name: "slideLeft",
                    duration: 300
                }
            });
        };
        // Init variables
        this.title = "My grocery list";
        this.isEditing = false;
        this.selectedListIndex = 0;
        // Load grocery lists and selected grocery list details
        this.retrieveMyLists();
    }
    AppGroceryListDetailsComponent.prototype.ngOnInit = function () {
    };
    AppGroceryListDetailsComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    };
    __decorate([
        core_1.ViewChild(side_drawer_directives_1.RadSideDrawerComponent),
        __metadata("design:type", side_drawer_directives_1.RadSideDrawerComponent)
    ], AppGroceryListDetailsComponent.prototype, "drawerComponent", void 0);
    AppGroceryListDetailsComponent = __decorate([
        core_1.Component({
            selector: "app-grocery-list-details",
            templateUrl: "components/grocery-list-details/views/app-grocery-list-details.component.html",
            styleUrls: ["components/grocery-list-details/styles/app-grocery-list-details.component.css"],
            providers: [app_grocery_list_database_service_1.GroceryListDetailsDBService, app_my_grocery_lists_database_service_1.MyGroceryListsDBService]
        }),
        __metadata("design:paramtypes", [app_grocery_list_database_service_1.GroceryListDetailsDBService,
            app_my_grocery_lists_database_service_1.MyGroceryListsDBService,
            core_1.ChangeDetectorRef,
            router_extensions_1.RouterExtensions,
            page_1.Page])
    ], AppGroceryListDetailsComponent);
    return AppGroceryListDetailsComponent;
}());
exports.AppGroceryListDetailsComponent = AppGroceryListDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1ncm9jZXJ5LWxpc3QtZGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Y7QUFDL0Ysc0RBQXFEO0FBQ3JELG1GQUFpRjtBQUVqRixvR0FBbUg7QUFHbkgsa0lBQTJIO0FBQzNILHNJQUF1SDtBQVN2SDtJQVdFLHdDQUNVLDJCQUF3RCxFQUN4RCx1QkFBZ0QsRUFDaEQsbUJBQXNDLEVBQ3RDLGdCQUFrQyxFQUNuQyxJQUFVO1FBTG5CLGlCQWNDO1FBYlMsZ0NBQTJCLEdBQTNCLDJCQUEyQixDQUE2QjtRQUN4RCw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDdEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNuQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBb0JuQix3R0FBd0c7UUFDakcsb0JBQWUsR0FBRztZQUN2QixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBUyxJQUFLLE9BQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixDQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzlFLENBQUMsQ0FBQTtRQUVNLHVCQUFrQixHQUFHO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsSUFBTSxTQUFTLEdBQWtCLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lB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QUM5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQXhCa0M7UUFBbEMsZ0JBQVMsQ0FBQywrQ0FBc0IsQ0FBQztrQ0FBeUIsK0NBQXNCOzJFQUFDO0lBVHZFLDhCQUE4QjtRQU4xQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxXQUFXLEVBQUUsK0VBQStFO1lBQzVGLFNBQVMsRUFBRSxDQUFDLCtFQUErRSxDQUFDO1lBQzVGLFNBQVMsRUFBRSxDQUFDLCtEQUEyQixFQUFFLCtEQUF1QixDQUFDO1NBQ2xFLENBQUM7eUNBYXVDLCtEQUEyQjtZQUMvQiwrREFBdUI7WUFDM0Isd0JBQWlCO1lBQ3BCLG9DQUFnQjtZQUM3QixXQUFJO09BaEJSLDhCQUE4QixDQWdJMUM7SUFBRCxxQ0FBQztDQUFBLEFBaElELElBZ0lDO0FBaElZLHdFQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9uc1wiO1xyXG5cclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhci9zaWRlLWRyYXdlci1kaXJlY3RpdmVzXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XHJcblxyXG5pbXBvcnQgeyBHcm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL2dyb2NlcnktbGlzdC1kZXRhaWxzL3NlcnZpY2VzL2FwcC1ncm9jZXJ5LWxpc3QuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNeUdyb2NlcnlMaXN0c0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvbXktZ3JvY2VyeS1saXN0cy9zZXJ2aWNlcy9hcHAtbXktZ3JvY2VyeS1saXN0cy5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzXCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiY29tcG9uZW50cy9ncm9jZXJ5LWxpc3QtZGV0YWlscy92aWV3cy9hcHAtZ3JvY2VyeS1saXN0LWRldGFpbHMuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImNvbXBvbmVudHMvZ3JvY2VyeS1saXN0LWRldGFpbHMvc3R5bGVzL2FwcC1ncm9jZXJ5LWxpc3QtZGV0YWlscy5jb21wb25lbnQuY3NzXCJdLFxyXG4gIHByb3ZpZGVyczogW0dyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZSwgTXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBHcm9jZXJ5TGlzdERldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgcHVibGljIG15TGlzdHM6IEFycmF5PGFueT47XHJcbiAgcHVibGljIGdyb2NlcnlMaXN0OiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBzZWxlY3RlZExpc3RJbmRleDogbnVtYmVyO1xyXG5cclxuICBwcml2YXRlIGRyYXdlcjogUmFkU2lkZURyYXdlcjtcclxuXHJcbiAgQFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZ3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlOiBHcm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG15R3JvY2VyeUxpc3RzREJTZXJ2aWNlOiBNeUdyb2NlcnlMaXN0c0RCU2VydmljZSxcclxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwdWJsaWMgcGFnZTogUGFnZVxyXG4gICkge1xyXG4gICAgLy8gSW5pdCB2YXJpYWJsZXNcclxuICAgIHRoaXMudGl0bGUgPSBcIk15IGdyb2NlcnkgbGlzdFwiO1xyXG4gICAgdGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRMaXN0SW5kZXggPSAwO1xyXG5cclxuICAgIC8vIExvYWQgZ3JvY2VyeSBsaXN0cyBhbmQgc2VsZWN0ZWQgZ3JvY2VyeSBsaXN0IGRldGFpbHNcclxuICAgIHRoaXMucmV0cmlldmVNeUxpc3RzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcclxuICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBHRVRURVJTIEFORCBTRVRURVJTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgZ2V0TXlMaXN0c05hbWVzID0gKCk6IEFycmF5PHN0cmluZz4gPT4ge1xyXG4gICAgcmV0dXJuICEhdGhpcy5teUxpc3RzID8gdGhpcy5teUxpc3RzLm1hcCgobGlzdDogYW55KSA9PiBsaXN0Lmxpc3ROYW1lKSA6IFtdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEN1cnJlbnRMaXN0TmFtZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHRoaXMubXlMaXN0cyAmJiB0aGlzLm15TGlzdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBsaXN0TmFtZXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLmdldE15TGlzdHNOYW1lcygpO1xyXG4gICAgICByZXR1cm4gbGlzdE5hbWVzW3RoaXMuc2VsZWN0ZWRMaXN0SW5kZXhdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBTRVJWSUNFUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIHJldHJpZXZlTXlMaXN0cyA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMubXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2UuZ2V0TXlMaXN0cygpLnRoZW4oKG15TGlzdHM6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLm15TGlzdHMgPSAhIW15TGlzdHMgPyBteUxpc3RzIDogW107XHJcblxyXG4gICAgICB0aGlzLnJldHJpZXZlR3JvY2VyeUxpc3REZXRhaWxzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXRyaWV2ZUdyb2NlcnlMaXN0RGV0YWlscyA9ICgpOiB2b2lkID0+IHtcclxuICAgIGlmICghIXRoaXMubXlMaXN0cyAmJiB0aGlzLm15TGlzdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBsaXN0SWQ6IG51bWJlciA9IHRoaXMubXlMaXN0c1t0aGlzLnNlbGVjdGVkTGlzdEluZGV4XS5saXN0SWQ7XHJcbiAgICAgIHRoaXMuZ3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlLmdldEdyb2NlcnlMaXN0RGV0YWlscyhsaXN0SWQpLnRoZW4oKGdyb2NlcnlMaXN0OiBhbnkpID0+IHRoaXMuZ3JvY2VyeUxpc3QgPSAhIWdyb2NlcnlMaXN0ID8gZ3JvY2VyeUxpc3QgOiBbXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlR3JvY2VyeUxpc3QgPSAocHJvZHVjdEluZGV4OiBudW1iZXIpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGxpc3RJZDogbnVtYmVyID0gdGhpcy5teUxpc3RzW3RoaXMuc2VsZWN0ZWRMaXN0SW5kZXhdLmxpc3RJZDtcclxuICAgIGNvbnN0IGdsaXN0SWQ6IG51bWJlciA9IHRoaXMuZ3JvY2VyeUxpc3RbcHJvZHVjdEluZGV4XS5pZDtcclxuICAgIGNvbnN0IHByb2R1Y3RJZDogbnVtYmVyID0gdGhpcy5ncm9jZXJ5TGlzdFtwcm9kdWN0SW5kZXhdLnByb2R1Y3RJZDtcclxuICAgIGNvbnN0IHF1YW50aXR5OiBudW1iZXIgPSB0aGlzLmdyb2NlcnlMaXN0W3Byb2R1Y3RJbmRleF0ucXVhbnRpdHk7XHJcbiAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgZWxlbWVudCAjJHtwcm9kdWN0SW5kZXh9OiAke2xpc3RJZH0gJHtwcm9kdWN0SWR9ICR7cXVhbnRpdHl9YCk7XHJcbiAgICB0aGlzLmdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZS51cGRhdGVHcm9jZXJ5TGlzdERldGFpbHMoZ2xpc3RJZCwgbGlzdElkLCBwcm9kdWN0SWQsIHF1YW50aXR5KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZWxldGVHcm9jZXJ5TGlzdEl0ZW0gPSAocHJvZHVjdEluZGV4OiBudW1iZXIpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGdsaXN0SWQ6IG51bWJlciA9IHRoaXMuZ3JvY2VyeUxpc3RbcHJvZHVjdEluZGV4XS5pZDtcclxuICAgIGNvbnNvbGUubG9nKGBEZWxldGluZyBlbGVtZW50ICMke3Byb2R1Y3RJbmRleH1gKTtcclxuICAgIC8vIFVwZGF0ZSBEQlxyXG4gICAgdGhpcy5ncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UuZGVsZXRlR3JvY2VyeUxpc3RJdGVtKGdsaXN0SWQpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBsaXN0XHJcbiAgICB0aGlzLmdyb2NlcnlMaXN0LnNwbGljZShwcm9kdWN0SW5kZXgsIDEpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBDSEVDS0VSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGlzR3JvY2VyeUxpc3RFbXB0eSA9ICgpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiAhdGhpcy5ncm9jZXJ5TGlzdCB8fCB0aGlzLmdyb2NlcnlMaXN0Lmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBIQU5ETEVSUy9BQ1RJT05TIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBvbkxpc3RJdGVtVGFwID0gKGxpc3ROYW1lOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IG15TGlzdHNOYW1lczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuZ2V0TXlMaXN0c05hbWVzKCk7XHJcbiAgICBpZiAobGlzdE5hbWUgJiYgbXlMaXN0c05hbWVzICYmIG15TGlzdHNOYW1lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIFVwZGF0ZSBjdXJyZW50IGxpc3QgaW5kZXhcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJbmRleCA9IG15TGlzdHNOYW1lcy5pbmRleE9mKGxpc3ROYW1lKTtcclxuXHJcbiAgICAgIHRoaXMucmV0cmlldmVHcm9jZXJ5TGlzdERldGFpbHMoKTtcclxuXHJcbiAgICAgIC8vIENsb3NlIGRyYXdlclxyXG4gICAgICB0aGlzLmNsb3NlRHJhd2VyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3dpdGNoRWRpdE1vZGUgPSAoKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLmlzRWRpdGluZyA9ICF0aGlzLmlzRWRpdGluZztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvcGVuRHJhd2VyID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsb3NlRHJhd2VyID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnb1RvR3JvY2VyeUxpc3RGb3JtID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW5nIHRvIFByb2R1Y3QgTGlzdC4uLlwiKTtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9wcm9kdWN0TGlzdC9saXN0XCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlTGVmdFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==