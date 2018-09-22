"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var dialogs_1 = require("ui/dialogs");
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
                return listNames[_this.activeListIndex];
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
                var listId = _this.myLists[_this.activeListIndex].listId;
                _this.groceryListDetailsDBService.getGroceryListDetails(listId)
                    .then(function (groceryList) { return _this.groceryList = !!groceryList ? groceryList : []; });
            }
        };
        this.updateGroceryList = function (productIndex) {
            var listId = _this.myLists[_this.activeListIndex].listId;
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
        this.switchEditMode = function () {
            _this.isEditing = !_this.isEditing;
        };
        this.showMyListsDialog = function () {
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
        this.openDrawer = function () {
            _this.drawer.showDrawer();
        };
        this.closeDrawer = function () {
            _this.drawer.closeDrawer();
        };
        this.navigateTo = function (path, param) {
            console.log("Navigating to", path, param);
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
        this.title = "My grocery list";
        this.isEditing = false;
        this.activeListIndex = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1ncm9jZXJ5LWxpc3QtZGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Y7QUFDL0Ysc0RBQXFEO0FBQ3JELG1GQUFpRjtBQUNqRixzQ0FBb0M7QUFFcEMsb0dBQW1HO0FBR25HLGtJQUEySDtBQUMzSCxzSUFBdUg7QUFTdkg7SUFXRSx3Q0FDVSwyQkFBd0QsRUFDeEQsdUJBQWdELEVBQ2hELG1CQUFzQyxFQUN0QyxnQkFBa0MsRUFDbkMsSUFBVTtRQUxuQixpQkFjQztRQWJTLGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBNkI7UUFDeEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQ3RDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbkMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQW9CbkIsd0dBQXdHO1FBQ2pHLG9CQUFlLEdBQUc7WUFDdkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsQ0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDLENBQUE7UUFFTSx1QkFBa0IsR0FBRztZQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLElBQU0sU0FBUyxHQUFrQixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lB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QUFDLGNBQWMsRUFBRTtnQkFDN0MsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxXQUFXO29CQUNqQixRQUFRLEVBQUUsR0FBRztpQkFDZDthQUNGLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQXZIQyxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUV6Qix1REFBdUQ7UUFDdkQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpREFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELHdEQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBeEJrQztRQUFsQyxnQkFBUyxDQUFDLCtDQUFzQixDQUFDO2tDQUF5QiwrQ0FBc0I7MkVBQUM7SUFUdkUsOEJBQThCO1FBTjFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFdBQVcsRUFBRSwrRUFBK0U7WUFDNUYsU0FBUyxFQUFFLENBQUMsK0VBQStFLENBQUM7WUFDNUYsU0FBUyxFQUFFLENBQUMsK0RBQTJCLEVBQUUsK0RBQXVCLENBQUM7U0FDbEUsQ0FBQzt5Q0FhdUMsK0RBQTJCO1lBQy9CLCtEQUF1QjtZQUMzQix3QkFBaUI7WUFDcEIsb0NBQWdCO1lBQzdCLFdBQUk7T0FoQlIsOEJBQThCLENBMEkxQztJQUFELHFDQUFDO0NBQUEsQUExSUQsSUEwSUM7QUExSVksd0VBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBPbkluaXQsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyL3JvdXRlci1leHRlbnNpb25zXCI7XHJcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcblxyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXIvc2lkZS1kcmF3ZXItZGlyZWN0aXZlc1wiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXInO1xyXG5cclxuaW1wb3J0IHsgR3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9ncm9jZXJ5LWxpc3QtZGV0YWlscy9zZXJ2aWNlcy9hcHAtZ3JvY2VyeS1saXN0LmRhdGFiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL215LWdyb2NlcnktbGlzdHMvc2VydmljZXMvYXBwLW15LWdyb2NlcnktbGlzdHMuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC1ncm9jZXJ5LWxpc3QtZGV0YWlsc1wiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvZ3JvY2VyeS1saXN0LWRldGFpbHMvdmlld3MvYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJjb21wb25lbnRzL2dyb2NlcnktbGlzdC1kZXRhaWxzL3N0eWxlcy9hcHAtZ3JvY2VyeS1saXN0LWRldGFpbHMuY29tcG9uZW50LmNzc1wiXSxcclxuICBwcm92aWRlcnM6IFtHcm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UsIE15R3JvY2VyeUxpc3RzREJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwR3JvY2VyeUxpc3REZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcclxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICBwdWJsaWMgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIHB1YmxpYyBteUxpc3RzOiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBncm9jZXJ5TGlzdDogQXJyYXk8YW55PjtcclxuICBwcml2YXRlIGFjdGl2ZUxpc3RJbmRleDogbnVtYmVyO1xyXG4gIFxyXG4gIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xyXG5cclxuICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2U6IEdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZSxcclxuICAgIHByaXZhdGUgbXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2U6IE15R3JvY2VyeUxpc3RzREJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHB1YmxpYyBwYWdlOiBQYWdlXHJcbiAgKSB7XHJcbiAgICAvLyBJbml0IHZhcmlhYmxlc1xyXG4gICAgdGhpcy50aXRsZSA9IFwiTXkgZ3JvY2VyeSBsaXN0XCI7XHJcbiAgICB0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5hY3RpdmVMaXN0SW5kZXggPSAwO1xyXG5cclxuICAgIC8vIExvYWQgZ3JvY2VyeSBsaXN0cyBhbmQgc2VsZWN0ZWQgZ3JvY2VyeSBsaXN0IGRldGFpbHNcclxuICAgIHRoaXMucmV0cmlldmVNeUxpc3RzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcclxuICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBHRVRURVJTIEFORCBTRVRURVJTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgZ2V0TXlMaXN0c05hbWVzID0gKCk6IEFycmF5PHN0cmluZz4gPT4ge1xyXG4gICAgcmV0dXJuICEhdGhpcy5teUxpc3RzID8gdGhpcy5teUxpc3RzLm1hcCgobGlzdDogYW55KSA9PiBsaXN0Lmxpc3ROYW1lKSA6IFtdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEN1cnJlbnRMaXN0TmFtZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHRoaXMubXlMaXN0cyAmJiB0aGlzLm15TGlzdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBsaXN0TmFtZXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLmdldE15TGlzdHNOYW1lcygpO1xyXG4gICAgICByZXR1cm4gbGlzdE5hbWVzW3RoaXMuYWN0aXZlTGlzdEluZGV4XTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBcIi1cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gU0VSVklDRVMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyByZXRyaWV2ZU15TGlzdHMgPSAoKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLm15R3JvY2VyeUxpc3RzREJTZXJ2aWNlLmdldE15TGlzdHMoKS50aGVuKChteUxpc3RzOiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5teUxpc3RzID0gISFteUxpc3RzID8gbXlMaXN0cyA6IFtdO1xyXG5cclxuICAgICAgdGhpcy5yZXRyaWV2ZUdyb2NlcnlMaXN0RGV0YWlscygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmV0cmlldmVHcm9jZXJ5TGlzdERldGFpbHMgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBpZiAoISF0aGlzLm15TGlzdHMgJiYgdGhpcy5teUxpc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgbGlzdElkOiBudW1iZXIgPSB0aGlzLm15TGlzdHNbdGhpcy5hY3RpdmVMaXN0SW5kZXhdLmxpc3RJZDtcclxuICAgICAgdGhpcy5ncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UuZ2V0R3JvY2VyeUxpc3REZXRhaWxzKGxpc3RJZClcclxuICAgICAgICAudGhlbigoZ3JvY2VyeUxpc3Q6IGFueSkgPT4gdGhpcy5ncm9jZXJ5TGlzdCA9ICEhZ3JvY2VyeUxpc3QgPyBncm9jZXJ5TGlzdCA6IFtdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVHcm9jZXJ5TGlzdCA9IChwcm9kdWN0SW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgbGlzdElkOiBudW1iZXIgPSB0aGlzLm15TGlzdHNbdGhpcy5hY3RpdmVMaXN0SW5kZXhdLmxpc3RJZDtcclxuICAgIGNvbnN0IGdsaXN0SWQ6IG51bWJlciA9IHRoaXMuZ3JvY2VyeUxpc3RbcHJvZHVjdEluZGV4XS5pZDtcclxuICAgIGNvbnN0IHByb2R1Y3RJZDogbnVtYmVyID0gdGhpcy5ncm9jZXJ5TGlzdFtwcm9kdWN0SW5kZXhdLnByb2R1Y3RJZDtcclxuICAgIGNvbnN0IHF1YW50aXR5OiBudW1iZXIgPSB0aGlzLmdyb2NlcnlMaXN0W3Byb2R1Y3RJbmRleF0ucXVhbnRpdHk7XHJcbiAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgZWxlbWVudCAjJHtwcm9kdWN0SW5kZXh9OiAke2xpc3RJZH0gJHtwcm9kdWN0SWR9ICR7cXVhbnRpdHl9YCk7XHJcbiAgICB0aGlzLmdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZS51cGRhdGVHcm9jZXJ5TGlzdERldGFpbHMoZ2xpc3RJZCwgbGlzdElkLCBwcm9kdWN0SWQsIHF1YW50aXR5KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZWxldGVHcm9jZXJ5TGlzdEl0ZW0gPSAocHJvZHVjdEluZGV4OiBudW1iZXIpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGdsaXN0SWQ6IG51bWJlciA9IHRoaXMuZ3JvY2VyeUxpc3RbcHJvZHVjdEluZGV4XS5pZDtcclxuICAgIGNvbnNvbGUubG9nKGBEZWxldGluZyBlbGVtZW50ICMke3Byb2R1Y3RJbmRleH1gKTtcclxuICAgIC8vIFVwZGF0ZSBEQlxyXG4gICAgdGhpcy5ncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UuZGVsZXRlR3JvY2VyeUxpc3RJdGVtKGdsaXN0SWQpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBsaXN0XHJcbiAgICB0aGlzLmdyb2NlcnlMaXN0LnNwbGljZShwcm9kdWN0SW5kZXgsIDEpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBDSEVDS0VSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGlzR3JvY2VyeUxpc3RFbXB0eSA9ICgpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiAhdGhpcy5ncm9jZXJ5TGlzdCB8fCB0aGlzLmdyb2NlcnlMaXN0Lmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBIQU5ETEVSUy9BQ1RJT05TIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBzd2l0Y2hFZGl0TW9kZSA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuaXNFZGl0aW5nID0gIXRoaXMuaXNFZGl0aW5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dNeUxpc3RzRGlhbG9nID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbXlMaXN0c05hbWVzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5nZXRNeUxpc3RzTmFtZXMoKTtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgdGl0bGU6IFwiQ2hvb3NlIGdyb2NlcnkgbGlzdDpcIixcclxuICAgICAgbWVzc2FnZTogXCJcIixcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcclxuICAgICAgYWN0aW9uczogbXlMaXN0c05hbWVzXHJcbiAgICB9O1xyXG5cclxuICAgIGFjdGlvbihvcHRpb25zKS50aGVuKChzZWxlY3RlZExpc3ROYW1lKSA9PiB7XHJcbiAgICAgIGlmIChzZWxlY3RlZExpc3ROYW1lICYmIHNlbGVjdGVkTGlzdE5hbWUgIT09IFwiQ2FuY2VsXCIgJiYgbXlMaXN0c05hbWVzICYmIG15TGlzdHNOYW1lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gVXBkYXRlIGN1cnJlbnQgbGlzdCBpbmRleFxyXG4gICAgICAgIHRoaXMuYWN0aXZlTGlzdEluZGV4ID0gbXlMaXN0c05hbWVzLmluZGV4T2Yoc2VsZWN0ZWRMaXN0TmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmV0cmlldmVHcm9jZXJ5TGlzdERldGFpbHMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3BlbkRyYXdlciA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9zZURyYXdlciA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmF2aWdhdGVUbyA9IChwYXRoOiBzdHJpbmcsIHBhcmFtPzogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG9cIiwgcGF0aCwgcGFyYW0pO1xyXG4gICAgY29uc3QgYWN0aXZlTGlzdElkOiBudW1iZXIgPSB0aGlzLm15TGlzdHNbdGhpcy5hY3RpdmVMaXN0SW5kZXhdLmxpc3RJZDtcclxuICAgIGNvbnN0IG5hdmlnYXRlUGFyYW1zOiBBcnJheTxhbnk+ID0gcGFyYW0gPyBbcGF0aCwgcGFyYW0sIGFjdGl2ZUxpc3RJZF0gOiBbcGF0aF07XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUobmF2aWdhdGVQYXJhbXMsIHtcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVMZWZ0XCIsXHJcbiAgICAgICAgZHVyYXRpb246IDMwMFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19