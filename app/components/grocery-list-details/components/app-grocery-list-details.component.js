"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var side_drawer_directives_1 = require("nativescript-ui-sidedrawer/angular/side-drawer-directives");
var app_grocery_list_details_database_service_1 = require("~/components/grocery-list-details/services/app-grocery-list-details.database.service");
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
            console.log("Navigating to MyGroceryLists...");
            _this.routerExtensions.navigate(["/home/groceryList/groceryListForm"], {
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
            providers: [app_grocery_list_details_database_service_1.GroceryListDetailsDBService, app_my_grocery_lists_database_service_1.MyGroceryListsDBService]
        }),
        __metadata("design:paramtypes", [app_grocery_list_details_database_service_1.GroceryListDetailsDBService,
            app_my_grocery_lists_database_service_1.MyGroceryListsDBService,
            core_1.ChangeDetectorRef,
            router_extensions_1.RouterExtensions,
            page_1.Page])
    ], AppGroceryListDetailsComponent);
    return AppGroceryListDetailsComponent;
}());
exports.AppGroceryListDetailsComponent = AppGroceryListDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1ncm9jZXJ5LWxpc3QtZGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Y7QUFDL0Ysc0RBQXFEO0FBQ3JELG1GQUFpRjtBQUVqRixvR0FBbUg7QUFHbkgsa0pBQW1JO0FBQ25JLHNJQUF1SDtBQVN2SDtJQVdFLHdDQUNVLDJCQUF3RCxFQUN4RCx1QkFBZ0QsRUFDaEQsbUJBQXNDLEVBQ3RDLGdCQUFrQyxFQUNuQyxJQUFVO1FBTG5CLGlCQWNDO1FBYlMsZ0NBQTJCLEdBQTNCLDJCQUEyQixDQUE2QjtRQUN4RCw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDdEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNuQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBb0JuQix3R0FBd0c7UUFDakcsb0JBQWUsR0FBRztZQUN2QixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBUyxJQUFLLE9BQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixDQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzlFLENBQUMsQ0FBQTtRQUVNLHVCQUFrQixHQUFHO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsSUFBTSxTQUFTLEdBQWtCLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lB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QUM5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQXhCa0M7UUFBbEMsZ0JBQVMsQ0FBQywrQ0FBc0IsQ0FBQztrQ0FBeUIsK0NBQXNCOzJFQUFDO0lBVHZFLDhCQUE4QjtRQU4xQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxXQUFXLEVBQUUsK0VBQStFO1lBQzVGLFNBQVMsRUFBRSxDQUFDLCtFQUErRSxDQUFDO1lBQzVGLFNBQVMsRUFBRSxDQUFDLHVFQUEyQixFQUFFLCtEQUF1QixDQUFDO1NBQ2xFLENBQUM7eUNBYXVDLHVFQUEyQjtZQUMvQiwrREFBdUI7WUFDM0Isd0JBQWlCO1lBQ3BCLG9DQUFnQjtZQUM3QixXQUFJO09BaEJSLDhCQUE4QixDQWdJMUM7SUFBRCxxQ0FBQztDQUFBLEFBaElELElBZ0lDO0FBaElZLHdFQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9uc1wiO1xyXG5cclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhci9zaWRlLWRyYXdlci1kaXJlY3RpdmVzXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XHJcblxyXG5pbXBvcnQgeyBHcm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL2dyb2NlcnktbGlzdC1kZXRhaWxzL3NlcnZpY2VzL2FwcC1ncm9jZXJ5LWxpc3QtZGV0YWlscy5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE15R3JvY2VyeUxpc3RzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9teS1ncm9jZXJ5LWxpc3RzL3NlcnZpY2VzL2FwcC1teS1ncm9jZXJ5LWxpc3RzLmRhdGFiYXNlLnNlcnZpY2VcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJhcHAtZ3JvY2VyeS1saXN0LWRldGFpbHNcIixcclxuICB0ZW1wbGF0ZVVybDogXCJjb21wb25lbnRzL2dyb2NlcnktbGlzdC1kZXRhaWxzL3ZpZXdzL2FwcC1ncm9jZXJ5LWxpc3QtZGV0YWlscy5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiY29tcG9uZW50cy9ncm9jZXJ5LWxpc3QtZGV0YWlscy9zdHlsZXMvYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgcHJvdmlkZXJzOiBbR3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlLCBNeUdyb2NlcnlMaXN0c0RCU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcEdyb2NlcnlMaXN0RGV0YWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XHJcbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgcHVibGljIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBwdWJsaWMgbXlMaXN0czogQXJyYXk8YW55PjtcclxuICBwdWJsaWMgZ3JvY2VyeUxpc3Q6IEFycmF5PGFueT47XHJcbiAgcHVibGljIHNlbGVjdGVkTGlzdEluZGV4OiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xyXG5cclxuICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2U6IEdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZSxcclxuICAgIHByaXZhdGUgbXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2U6IE15R3JvY2VyeUxpc3RzREJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHB1YmxpYyBwYWdlOiBQYWdlXHJcbiAgKSB7XHJcbiAgICAvLyBJbml0IHZhcmlhYmxlc1xyXG4gICAgdGhpcy50aXRsZSA9IFwiTXkgZ3JvY2VyeSBsaXN0XCI7XHJcbiAgICB0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RJbmRleCA9IDA7XHJcblxyXG4gICAgLy8gTG9hZCBncm9jZXJ5IGxpc3RzIGFuZCBzZWxlY3RlZCBncm9jZXJ5IGxpc3QgZGV0YWlsc1xyXG4gICAgdGhpcy5yZXRyaWV2ZU15TGlzdHMoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEdFVFRFUlMgQU5EIFNFVFRFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBnZXRNeUxpc3RzTmFtZXMgPSAoKTogQXJyYXk8c3RyaW5nPiA9PiB7XHJcbiAgICByZXR1cm4gISF0aGlzLm15TGlzdHMgPyB0aGlzLm15TGlzdHMubWFwKChsaXN0OiBhbnkpID0+IGxpc3QubGlzdE5hbWUpIDogW107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q3VycmVudExpc3ROYW1lID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAodGhpcy5teUxpc3RzICYmIHRoaXMubXlMaXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGxpc3ROYW1lczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuZ2V0TXlMaXN0c05hbWVzKCk7XHJcbiAgICAgIHJldHVybiBsaXN0TmFtZXNbdGhpcy5zZWxlY3RlZExpc3RJbmRleF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFNFUlZJQ0VTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgcmV0cmlldmVNeUxpc3RzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5teUdyb2NlcnlMaXN0c0RCU2VydmljZS5nZXRNeUxpc3RzKCkudGhlbigobXlMaXN0czogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMubXlMaXN0cyA9ICEhbXlMaXN0cyA/IG15TGlzdHMgOiBbXTtcclxuXHJcbiAgICAgIHRoaXMucmV0cmlldmVHcm9jZXJ5TGlzdERldGFpbHMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldHJpZXZlR3JvY2VyeUxpc3REZXRhaWxzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKCEhdGhpcy5teUxpc3RzICYmIHRoaXMubXlMaXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGxpc3RJZDogbnVtYmVyID0gdGhpcy5teUxpc3RzW3RoaXMuc2VsZWN0ZWRMaXN0SW5kZXhdLmxpc3RJZDtcclxuICAgICAgdGhpcy5ncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UuZ2V0R3JvY2VyeUxpc3REZXRhaWxzKGxpc3RJZCkudGhlbigoZ3JvY2VyeUxpc3Q6IGFueSkgPT4gdGhpcy5ncm9jZXJ5TGlzdCA9ICEhZ3JvY2VyeUxpc3QgPyBncm9jZXJ5TGlzdCA6IFtdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVHcm9jZXJ5TGlzdCA9IChwcm9kdWN0SW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgbGlzdElkOiBudW1iZXIgPSB0aGlzLm15TGlzdHNbdGhpcy5zZWxlY3RlZExpc3RJbmRleF0ubGlzdElkO1xyXG4gICAgY29uc3QgZ2xpc3RJZDogbnVtYmVyID0gdGhpcy5ncm9jZXJ5TGlzdFtwcm9kdWN0SW5kZXhdLmlkO1xyXG4gICAgY29uc3QgcHJvZHVjdElkOiBudW1iZXIgPSB0aGlzLmdyb2NlcnlMaXN0W3Byb2R1Y3RJbmRleF0ucHJvZHVjdElkO1xyXG4gICAgY29uc3QgcXVhbnRpdHk6IG51bWJlciA9IHRoaXMuZ3JvY2VyeUxpc3RbcHJvZHVjdEluZGV4XS5xdWFudGl0eTtcclxuICAgIGNvbnNvbGUubG9nKGBVcGRhdGluZyBlbGVtZW50ICMke3Byb2R1Y3RJbmRleH06ICR7bGlzdElkfSAke3Byb2R1Y3RJZH0gJHtxdWFudGl0eX1gKTtcclxuICAgIHRoaXMuZ3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlLnVwZGF0ZUdyb2NlcnlMaXN0RGV0YWlscyhnbGlzdElkLCBsaXN0SWQsIHByb2R1Y3RJZCwgcXVhbnRpdHkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlbGV0ZUdyb2NlcnlMaXN0SXRlbSA9IChwcm9kdWN0SW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgZ2xpc3RJZDogbnVtYmVyID0gdGhpcy5ncm9jZXJ5TGlzdFtwcm9kdWN0SW5kZXhdLmlkO1xyXG4gICAgY29uc29sZS5sb2coYERlbGV0aW5nIGVsZW1lbnQgIyR7cHJvZHVjdEluZGV4fWApO1xyXG4gICAgLy8gVXBkYXRlIERCXHJcbiAgICB0aGlzLmdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZS5kZWxldGVHcm9jZXJ5TGlzdEl0ZW0oZ2xpc3RJZCk7XHJcblxyXG4gICAgLy8gVXBkYXRlIGxpc3RcclxuICAgIHRoaXMuZ3JvY2VyeUxpc3Quc3BsaWNlKHByb2R1Y3RJbmRleCwgMSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIENIRUNLRVJTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgaXNHcm9jZXJ5TGlzdEVtcHR5ID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgcmV0dXJuICF0aGlzLmdyb2NlcnlMaXN0IHx8IHRoaXMuZ3JvY2VyeUxpc3QubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEhBTkRMRVJTL0FDVElPTlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIG9uTGlzdEl0ZW1UYXAgPSAobGlzdE5hbWU6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgbXlMaXN0c05hbWVzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5nZXRNeUxpc3RzTmFtZXMoKTtcclxuICAgIGlmIChsaXN0TmFtZSAmJiBteUxpc3RzTmFtZXMgJiYgbXlMaXN0c05hbWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gVXBkYXRlIGN1cnJlbnQgbGlzdCBpbmRleFxyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEluZGV4ID0gbXlMaXN0c05hbWVzLmluZGV4T2YobGlzdE5hbWUpO1xyXG5cclxuICAgICAgdGhpcy5yZXRyaWV2ZUdyb2NlcnlMaXN0RGV0YWlscygpO1xyXG5cclxuICAgICAgLy8gQ2xvc2UgZHJhd2VyXHJcbiAgICAgIHRoaXMuY2xvc2VEcmF3ZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzd2l0Y2hFZGl0TW9kZSA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuaXNFZGl0aW5nID0gIXRoaXMuaXNFZGl0aW5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9wZW5EcmF3ZXIgPSAoKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLmRyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xvc2VEcmF3ZXIgPSAoKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdvVG9Hcm9jZXJ5TGlzdEZvcm0gPSAoKTogdm9pZCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG8gTXlHcm9jZXJ5TGlzdHMuLi5cIik7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvZ3JvY2VyeUxpc3QvZ3JvY2VyeUxpc3RGb3JtXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlTGVmdFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==