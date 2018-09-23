"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var dialogs_1 = require("ui/dialogs");
var side_drawer_directives_1 = require("nativescript-ui-sidedrawer/angular/side-drawer-directives");
var app_grocery_list_database_service_1 = require("~/components/grocery-list-details/services/app-grocery-list.database.service");
var app_my_grocery_lists_database_service_1 = require("~/components/my-grocery-lists/services/app-my-grocery-lists.database.service");
var app_component_1 = require("~/app.component");
var AppGroceryListDetailsComponent = /** @class */ (function (_super) {
    __extends(AppGroceryListDetailsComponent, _super);
    function AppGroceryListDetailsComponent(groceryListDetailsDBService, myGroceryListsDBService, _changeDetectionRef, routerExtensions, page) {
        var _this = _super.call(this) || this;
        _this.groceryListDetailsDBService = groceryListDetailsDBService;
        _this.myGroceryListsDBService = myGroceryListsDBService;
        _this._changeDetectionRef = _changeDetectionRef;
        _this.routerExtensions = routerExtensions;
        _this.page = page;
        //////////////////////////////////////// GETTERS AND SETTERS ///////////////////////////////////////////
        _this.getMyListsNames = function () {
            return !!_this.myLists ? _this.myLists.map(function (list) { return list.listName; }) : [];
        };
        _this.getCurrentListName = function () {
            if (_this.myLists && _this.myLists.length > 0) {
                var listNames = _this.getMyListsNames();
                return listNames[_this.activeListIndex];
            }
            else {
                return "-";
            }
        };
        ///////////////////////////////////////////// SERVICES /////////////////////////////////////////////////
        _this.retrieveMyLists = function () {
            _this.myGroceryListsDBService.getMyLists().then(function (myLists) {
                _this.myLists = !!myLists ? myLists : [];
                _this.retrieveGroceryListDetails();
            });
        };
        _this.retrieveGroceryListDetails = function () {
            if (!!_this.myLists && _this.myLists.length > 0) {
                var listId = _this.myLists[_this.activeListIndex].listId;
                _this.groceryListDetailsDBService.getGroceryListDetails(listId)
                    .then(function (groceryList) { return _this.groceryList = !!groceryList ? groceryList : []; });
            }
        };
        _this.updateGroceryList = function (productIndex) {
            var listId = _this.myLists[_this.activeListIndex].listId;
            var glistId = _this.groceryList[productIndex].id;
            var productId = _this.groceryList[productIndex].productId;
            var quantity = _this.groceryList[productIndex].quantity;
            _this.displayMessage("Updating element #" + productIndex + ": " + listId + " " + productId + " " + quantity);
            _this.groceryListDetailsDBService.updateGroceryListDetails(glistId, listId, productId, quantity);
        };
        _this.deleteGroceryListItem = function (productIndex) {
            var glistId = _this.groceryList[productIndex].id;
            _this.displayMessage("Deleting element #" + productIndex);
            // Update DB
            _this.groceryListDetailsDBService.deleteGroceryListItem(glistId);
            // Update list
            _this.groceryList.splice(productIndex, 1);
        };
        ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
        _this.isGroceryListEmpty = function () {
            return !_this.groceryList || _this.groceryList.length === 0;
        };
        ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
        _this.switchEditMode = function () {
            _this.isEditing = !_this.isEditing;
        };
        _this.showMyListsDialog = function () {
            var myListsNames = _this.getMyListsNames();
            var options = {
                title: "Choose grocery list:",
                message: "",
                cancelButtonText: "Cancel",
                actions: myListsNames
            };
            dialogs_1.action(options).then(function (selectedListName) {
                if (selectedListName && selectedListName !== "Cancel" && myListsNames && myListsNames.length > 0) {
                    // Update current list index
                    _this.activeListIndex = myListsNames.indexOf(selectedListName);
                    _this.retrieveGroceryListDetails();
                }
            });
        };
        _this.openDrawer = function () {
            _this.drawer.showDrawer();
        };
        _this.closeDrawer = function () {
            _this.drawer.closeDrawer();
        };
        _this.navigateTo = function (path, param) {
            console.log("Navigating to " + path + "   " + param);
            var activeListId = _this.myLists[_this.activeListIndex].listId;
            var navigateParams = param ? [path, param, activeListId] : [path];
            _this.routerExtensions.navigate(navigateParams, {
                transition: {
                    name: "slideLeft",
                    duration: 300
                }
            });
        };
        // Init variables
        _this.title = "My grocery list";
        _this.isEditing = false;
        _this.activeListIndex = 0;
        // Load grocery lists and selected grocery list details
        _this.retrieveMyLists();
        return _this;
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
}(app_component_1.AppComponent));
exports.AppGroceryListDetailsComponent = AppGroceryListDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1ncm9jZXJ5LWxpc3QtZGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Y7QUFDL0Ysc0RBQXFEO0FBQ3JELG1GQUFpRjtBQUNqRixzQ0FBb0M7QUFFcEMsb0dBQW1HO0FBR25HLGtJQUEySDtBQUMzSCxzSUFBdUg7QUFDdkgsaURBQStDO0FBUy9DO0lBQW9ELGtEQUFZO0lBVzlELHdDQUNVLDJCQUF3RCxFQUN4RCx1QkFBZ0QsRUFDaEQsbUJBQXNDLEVBQ3RDLGdCQUFrQyxFQUNuQyxJQUFVO1FBTG5CLFlBT0UsaUJBQU8sU0FTUjtRQWZTLGlDQUEyQixHQUEzQiwyQkFBMkIsQ0FBNkI7UUFDeEQsNkJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQ3RDLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbkMsVUFBSSxHQUFKLElBQUksQ0FBTTtRQXNCbkIsd0dBQXdHO1FBQ2pHLHFCQUFlLEdBQUc7WUFDdkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsQ0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDLENBQUE7UUFFTSx3QkFBa0IsR0FBRztZQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLElBQU0sU0FBUyxHQUFrQixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxT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Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9uc1wiO1xyXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyL3NpZGUtZHJhd2VyLWRpcmVjdGl2ZXNcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcclxuXHJcbmltcG9ydCB7IEdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvZ3JvY2VyeS1saXN0LWRldGFpbHMvc2VydmljZXMvYXBwLWdyb2NlcnktbGlzdC5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE15R3JvY2VyeUxpc3RzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9teS1ncm9jZXJ5LWxpc3RzL3NlcnZpY2VzL2FwcC1teS1ncm9jZXJ5LWxpc3RzLmRhdGFiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIn4vYXBwLmNvbXBvbmVudFwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC1ncm9jZXJ5LWxpc3QtZGV0YWlsc1wiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvZ3JvY2VyeS1saXN0LWRldGFpbHMvdmlld3MvYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJjb21wb25lbnRzL2dyb2NlcnktbGlzdC1kZXRhaWxzL3N0eWxlcy9hcHAtZ3JvY2VyeS1saXN0LWRldGFpbHMuY29tcG9uZW50LmNzc1wiXSxcclxuICBwcm92aWRlcnM6IFtHcm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UsIE15R3JvY2VyeUxpc3RzREJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwR3JvY2VyeUxpc3REZXRhaWxzQ29tcG9uZW50IGV4dGVuZHMgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcclxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICBwdWJsaWMgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIHB1YmxpYyBteUxpc3RzOiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBncm9jZXJ5TGlzdDogQXJyYXk8YW55PjtcclxuICBwcml2YXRlIGFjdGl2ZUxpc3RJbmRleDogbnVtYmVyO1xyXG4gIFxyXG4gIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xyXG5cclxuICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2U6IEdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZSxcclxuICAgIHByaXZhdGUgbXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2U6IE15R3JvY2VyeUxpc3RzREJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHB1YmxpYyBwYWdlOiBQYWdlXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIC8vIEluaXQgdmFyaWFibGVzXHJcbiAgICB0aGlzLnRpdGxlID0gXCJNeSBncm9jZXJ5IGxpc3RcIjtcclxuICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmFjdGl2ZUxpc3RJbmRleCA9IDA7XHJcblxyXG4gICAgLy8gTG9hZCBncm9jZXJ5IGxpc3RzIGFuZCBzZWxlY3RlZCBncm9jZXJ5IGxpc3QgZGV0YWlsc1xyXG4gICAgdGhpcy5yZXRyaWV2ZU15TGlzdHMoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEdFVFRFUlMgQU5EIFNFVFRFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBnZXRNeUxpc3RzTmFtZXMgPSAoKTogQXJyYXk8c3RyaW5nPiA9PiB7XHJcbiAgICByZXR1cm4gISF0aGlzLm15TGlzdHMgPyB0aGlzLm15TGlzdHMubWFwKChsaXN0OiBhbnkpID0+IGxpc3QubGlzdE5hbWUpIDogW107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q3VycmVudExpc3ROYW1lID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAodGhpcy5teUxpc3RzICYmIHRoaXMubXlMaXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGxpc3ROYW1lczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuZ2V0TXlMaXN0c05hbWVzKCk7XHJcbiAgICAgIHJldHVybiBsaXN0TmFtZXNbdGhpcy5hY3RpdmVMaXN0SW5kZXhdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBTRVJWSUNFUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIHJldHJpZXZlTXlMaXN0cyA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMubXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2UuZ2V0TXlMaXN0cygpLnRoZW4oKG15TGlzdHM6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLm15TGlzdHMgPSAhIW15TGlzdHMgPyBteUxpc3RzIDogW107XHJcblxyXG4gICAgICB0aGlzLnJldHJpZXZlR3JvY2VyeUxpc3REZXRhaWxzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXRyaWV2ZUdyb2NlcnlMaXN0RGV0YWlscyA9ICgpOiB2b2lkID0+IHtcclxuICAgIGlmICghIXRoaXMubXlMaXN0cyAmJiB0aGlzLm15TGlzdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBsaXN0SWQ6IG51bWJlciA9IHRoaXMubXlMaXN0c1t0aGlzLmFjdGl2ZUxpc3RJbmRleF0ubGlzdElkO1xyXG4gICAgICB0aGlzLmdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZS5nZXRHcm9jZXJ5TGlzdERldGFpbHMobGlzdElkKVxyXG4gICAgICAgIC50aGVuKChncm9jZXJ5TGlzdDogYW55KSA9PiB0aGlzLmdyb2NlcnlMaXN0ID0gISFncm9jZXJ5TGlzdCA/IGdyb2NlcnlMaXN0IDogW10pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZUdyb2NlcnlMaXN0ID0gKHByb2R1Y3RJbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBsaXN0SWQ6IG51bWJlciA9IHRoaXMubXlMaXN0c1t0aGlzLmFjdGl2ZUxpc3RJbmRleF0ubGlzdElkO1xyXG4gICAgY29uc3QgZ2xpc3RJZDogbnVtYmVyID0gdGhpcy5ncm9jZXJ5TGlzdFtwcm9kdWN0SW5kZXhdLmlkO1xyXG4gICAgY29uc3QgcHJvZHVjdElkOiBudW1iZXIgPSB0aGlzLmdyb2NlcnlMaXN0W3Byb2R1Y3RJbmRleF0ucHJvZHVjdElkO1xyXG4gICAgY29uc3QgcXVhbnRpdHk6IG51bWJlciA9IHRoaXMuZ3JvY2VyeUxpc3RbcHJvZHVjdEluZGV4XS5xdWFudGl0eTtcclxuICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoYFVwZGF0aW5nIGVsZW1lbnQgIyR7cHJvZHVjdEluZGV4fTogJHtsaXN0SWR9ICR7cHJvZHVjdElkfSAke3F1YW50aXR5fWApO1xyXG4gICAgdGhpcy5ncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UudXBkYXRlR3JvY2VyeUxpc3REZXRhaWxzKGdsaXN0SWQsIGxpc3RJZCwgcHJvZHVjdElkLCBxdWFudGl0eSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVsZXRlR3JvY2VyeUxpc3RJdGVtID0gKHByb2R1Y3RJbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBnbGlzdElkOiBudW1iZXIgPSB0aGlzLmdyb2NlcnlMaXN0W3Byb2R1Y3RJbmRleF0uaWQ7XHJcbiAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKGBEZWxldGluZyBlbGVtZW50ICMke3Byb2R1Y3RJbmRleH1gKTtcclxuICAgIC8vIFVwZGF0ZSBEQlxyXG4gICAgdGhpcy5ncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UuZGVsZXRlR3JvY2VyeUxpc3RJdGVtKGdsaXN0SWQpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBsaXN0XHJcbiAgICB0aGlzLmdyb2NlcnlMaXN0LnNwbGljZShwcm9kdWN0SW5kZXgsIDEpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBDSEVDS0VSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGlzR3JvY2VyeUxpc3RFbXB0eSA9ICgpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiAhdGhpcy5ncm9jZXJ5TGlzdCB8fCB0aGlzLmdyb2NlcnlMaXN0Lmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBIQU5ETEVSUy9BQ1RJT05TIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBzd2l0Y2hFZGl0TW9kZSA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuaXNFZGl0aW5nID0gIXRoaXMuaXNFZGl0aW5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dNeUxpc3RzRGlhbG9nID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbXlMaXN0c05hbWVzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5nZXRNeUxpc3RzTmFtZXMoKTtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgdGl0bGU6IFwiQ2hvb3NlIGdyb2NlcnkgbGlzdDpcIixcclxuICAgICAgbWVzc2FnZTogXCJcIixcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcclxuICAgICAgYWN0aW9uczogbXlMaXN0c05hbWVzXHJcbiAgICB9O1xyXG5cclxuICAgIGFjdGlvbihvcHRpb25zKS50aGVuKChzZWxlY3RlZExpc3ROYW1lKSA9PiB7XHJcbiAgICAgIGlmIChzZWxlY3RlZExpc3ROYW1lICYmIHNlbGVjdGVkTGlzdE5hbWUgIT09IFwiQ2FuY2VsXCIgJiYgbXlMaXN0c05hbWVzICYmIG15TGlzdHNOYW1lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gVXBkYXRlIGN1cnJlbnQgbGlzdCBpbmRleFxyXG4gICAgICAgIHRoaXMuYWN0aXZlTGlzdEluZGV4ID0gbXlMaXN0c05hbWVzLmluZGV4T2Yoc2VsZWN0ZWRMaXN0TmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmV0cmlldmVHcm9jZXJ5TGlzdERldGFpbHMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3BlbkRyYXdlciA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9zZURyYXdlciA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmF2aWdhdGVUbyA9IChwYXRoOiBzdHJpbmcsIHBhcmFtPzogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgTmF2aWdhdGluZyB0byAke3BhdGh9ICAgJHtwYXJhbX1gKTtcclxuICAgIGNvbnN0IGFjdGl2ZUxpc3RJZDogbnVtYmVyID0gdGhpcy5teUxpc3RzW3RoaXMuYWN0aXZlTGlzdEluZGV4XS5saXN0SWQ7XHJcbiAgICBjb25zdCBuYXZpZ2F0ZVBhcmFtczogQXJyYXk8YW55PiA9IHBhcmFtID8gW3BhdGgsIHBhcmFtLCBhY3RpdmVMaXN0SWRdIDogW3BhdGhdO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKG5hdmlnYXRlUGFyYW1zLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlTGVmdFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==