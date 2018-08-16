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
                    _this.selectedListIndex = myListsNames.indexOf(selectedListName);
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
        this.navigateTo = function (path) {
            console.log("Navigating to", path);
            _this.routerExtensions.navigate([path], {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1ncm9jZXJ5LWxpc3QtZGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Y7QUFDL0Ysc0RBQXFEO0FBQ3JELG1GQUFpRjtBQUNqRixzQ0FBb0M7QUFFcEMsb0dBQW1HO0FBR25HLGtJQUEySDtBQUMzSCxzSUFBdUg7QUFTdkg7SUFXRSx3Q0FDVSwyQkFBd0QsRUFDeEQsdUJBQWdELEVBQ2hELG1CQUFzQyxFQUN0QyxnQkFBa0MsRUFDbkMsSUFBVTtRQUxuQixpQkFjQztRQWJTLGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBNkI7UUFDeEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQ3RDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbkMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQW9CbkIsd0dBQXdHO1FBQ2pHLG9CQUFlLEdBQUc7WUFDdkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsQ0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDLENBQUE7UUFFTSx1QkFBa0IsR0FBRztZQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLElBQU0sU0FBUyxHQUFrQixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7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LENBQUM7UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUUzQix1REFBdUQ7UUFDdkQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpREFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELHdEQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBeEJrQztRQUFsQyxnQkFBUyxDQUFDLCtDQUFzQixDQUFDO2tDQUF5QiwrQ0FBc0I7MkVBQUM7SUFUdkUsOEJBQThCO1FBTjFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFdBQVcsRUFBRSwrRUFBK0U7WUFDNUYsU0FBUyxFQUFFLENBQUMsK0VBQStFLENBQUM7WUFDNUYsU0FBUyxFQUFFLENBQUMsK0RBQTJCLEVBQUUsK0RBQXVCLENBQUM7U0FDbEUsQ0FBQzt5Q0FhdUMsK0RBQTJCO1lBQy9CLCtEQUF1QjtZQUMzQix3QkFBaUI7WUFDcEIsb0NBQWdCO1lBQzdCLFdBQUk7T0FoQlIsOEJBQThCLENBdUkxQztJQUFELHFDQUFDO0NBQUEsQUF2SUQsSUF1SUM7QUF2SVksd0VBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBPbkluaXQsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyL3JvdXRlci1leHRlbnNpb25zXCI7XHJcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcblxyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXIvc2lkZS1kcmF3ZXItZGlyZWN0aXZlc1wiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXInO1xyXG5cclxuaW1wb3J0IHsgR3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9ncm9jZXJ5LWxpc3QtZGV0YWlscy9zZXJ2aWNlcy9hcHAtZ3JvY2VyeS1saXN0LmRhdGFiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL215LWdyb2NlcnktbGlzdHMvc2VydmljZXMvYXBwLW15LWdyb2NlcnktbGlzdHMuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC1ncm9jZXJ5LWxpc3QtZGV0YWlsc1wiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvZ3JvY2VyeS1saXN0LWRldGFpbHMvdmlld3MvYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJjb21wb25lbnRzL2dyb2NlcnktbGlzdC1kZXRhaWxzL3N0eWxlcy9hcHAtZ3JvY2VyeS1saXN0LWRldGFpbHMuY29tcG9uZW50LmNzc1wiXSxcclxuICBwcm92aWRlcnM6IFtHcm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UsIE15R3JvY2VyeUxpc3RzREJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwR3JvY2VyeUxpc3REZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcclxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICBwdWJsaWMgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIHB1YmxpYyBteUxpc3RzOiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBncm9jZXJ5TGlzdDogQXJyYXk8YW55PjtcclxuICBwdWJsaWMgc2VsZWN0ZWRMaXN0SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgcHJpdmF0ZSBkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XHJcblxyXG4gIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZTogR3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBteUdyb2NlcnlMaXN0c0RCU2VydmljZTogTXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2UsXHJcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHVibGljIHBhZ2U6IFBhZ2VcclxuICApIHtcclxuICAgIC8vIEluaXQgdmFyaWFibGVzXHJcbiAgICB0aGlzLnRpdGxlID0gXCJNeSBncm9jZXJ5IGxpc3RcIjtcclxuICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdEluZGV4ID0gMDtcclxuXHJcbiAgICAvLyBMb2FkIGdyb2NlcnkgbGlzdHMgYW5kIHNlbGVjdGVkIGdyb2NlcnkgbGlzdCBkZXRhaWxzXHJcbiAgICB0aGlzLnJldHJpZXZlTXlMaXN0cygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gR0VUVEVSUyBBTkQgU0VUVEVSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGdldE15TGlzdHNOYW1lcyA9ICgpOiBBcnJheTxzdHJpbmc+ID0+IHtcclxuICAgIHJldHVybiAhIXRoaXMubXlMaXN0cyA/IHRoaXMubXlMaXN0cy5tYXAoKGxpc3Q6IGFueSkgPT4gbGlzdC5saXN0TmFtZSkgOiBbXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDdXJyZW50TGlzdE5hbWUgPSAoKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh0aGlzLm15TGlzdHMgJiYgdGhpcy5teUxpc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgbGlzdE5hbWVzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5nZXRNeUxpc3RzTmFtZXMoKTtcclxuICAgICAgcmV0dXJuIGxpc3ROYW1lc1t0aGlzLnNlbGVjdGVkTGlzdEluZGV4XTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBcIi1cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gU0VSVklDRVMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyByZXRyaWV2ZU15TGlzdHMgPSAoKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLm15R3JvY2VyeUxpc3RzREJTZXJ2aWNlLmdldE15TGlzdHMoKS50aGVuKChteUxpc3RzOiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5teUxpc3RzID0gISFteUxpc3RzID8gbXlMaXN0cyA6IFtdO1xyXG5cclxuICAgICAgdGhpcy5yZXRyaWV2ZUdyb2NlcnlMaXN0RGV0YWlscygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmV0cmlldmVHcm9jZXJ5TGlzdERldGFpbHMgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBpZiAoISF0aGlzLm15TGlzdHMgJiYgdGhpcy5teUxpc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgbGlzdElkOiBudW1iZXIgPSB0aGlzLm15TGlzdHNbdGhpcy5zZWxlY3RlZExpc3RJbmRleF0ubGlzdElkO1xyXG4gICAgICB0aGlzLmdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZS5nZXRHcm9jZXJ5TGlzdERldGFpbHMobGlzdElkKS50aGVuKChncm9jZXJ5TGlzdDogYW55KSA9PiB0aGlzLmdyb2NlcnlMaXN0ID0gISFncm9jZXJ5TGlzdCA/IGdyb2NlcnlMaXN0IDogW10pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZUdyb2NlcnlMaXN0ID0gKHByb2R1Y3RJbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBsaXN0SWQ6IG51bWJlciA9IHRoaXMubXlMaXN0c1t0aGlzLnNlbGVjdGVkTGlzdEluZGV4XS5saXN0SWQ7XHJcbiAgICBjb25zdCBnbGlzdElkOiBudW1iZXIgPSB0aGlzLmdyb2NlcnlMaXN0W3Byb2R1Y3RJbmRleF0uaWQ7XHJcbiAgICBjb25zdCBwcm9kdWN0SWQ6IG51bWJlciA9IHRoaXMuZ3JvY2VyeUxpc3RbcHJvZHVjdEluZGV4XS5wcm9kdWN0SWQ7XHJcbiAgICBjb25zdCBxdWFudGl0eTogbnVtYmVyID0gdGhpcy5ncm9jZXJ5TGlzdFtwcm9kdWN0SW5kZXhdLnF1YW50aXR5O1xyXG4gICAgY29uc29sZS5sb2coYFVwZGF0aW5nIGVsZW1lbnQgIyR7cHJvZHVjdEluZGV4fTogJHtsaXN0SWR9ICR7cHJvZHVjdElkfSAke3F1YW50aXR5fWApO1xyXG4gICAgdGhpcy5ncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UudXBkYXRlR3JvY2VyeUxpc3REZXRhaWxzKGdsaXN0SWQsIGxpc3RJZCwgcHJvZHVjdElkLCBxdWFudGl0eSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVsZXRlR3JvY2VyeUxpc3RJdGVtID0gKHByb2R1Y3RJbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBnbGlzdElkOiBudW1iZXIgPSB0aGlzLmdyb2NlcnlMaXN0W3Byb2R1Y3RJbmRleF0uaWQ7XHJcbiAgICBjb25zb2xlLmxvZyhgRGVsZXRpbmcgZWxlbWVudCAjJHtwcm9kdWN0SW5kZXh9YCk7XHJcbiAgICAvLyBVcGRhdGUgREJcclxuICAgIHRoaXMuZ3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlLmRlbGV0ZUdyb2NlcnlMaXN0SXRlbShnbGlzdElkKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgbGlzdFxyXG4gICAgdGhpcy5ncm9jZXJ5TGlzdC5zcGxpY2UocHJvZHVjdEluZGV4LCAxKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gQ0hFQ0tFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBpc0dyb2NlcnlMaXN0RW1wdHkgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gIXRoaXMuZ3JvY2VyeUxpc3QgfHwgdGhpcy5ncm9jZXJ5TGlzdC5sZW5ndGggPT09IDA7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gSEFORExFUlMvQUNUSU9OUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgc3dpdGNoRWRpdE1vZGUgPSAoKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLmlzRWRpdGluZyA9ICF0aGlzLmlzRWRpdGluZztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93TXlMaXN0c0RpYWxvZyA9ICgpID0+IHtcclxuICAgIGNvbnN0IG15TGlzdHNOYW1lczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuZ2V0TXlMaXN0c05hbWVzKCk7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHRpdGxlOiBcIkNob29zZSBncm9jZXJ5IGxpc3Q6XCIsXHJcbiAgICAgIG1lc3NhZ2U6IFwiXCIsXHJcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXHJcbiAgICAgIGFjdGlvbnM6IG15TGlzdHNOYW1lc1xyXG4gICAgfTtcclxuXHJcbiAgICBhY3Rpb24ob3B0aW9ucykudGhlbigoc2VsZWN0ZWRMaXN0TmFtZSkgPT4ge1xyXG4gICAgICBpZiAoc2VsZWN0ZWRMaXN0TmFtZSAmJiBzZWxlY3RlZExpc3ROYW1lICE9PSBcIkNhbmNlbFwiICYmIG15TGlzdHNOYW1lcyAmJiBteUxpc3RzTmFtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vIFVwZGF0ZSBjdXJyZW50IGxpc3QgaW5kZXhcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdEluZGV4ID0gbXlMaXN0c05hbWVzLmluZGV4T2Yoc2VsZWN0ZWRMaXN0TmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmV0cmlldmVHcm9jZXJ5TGlzdERldGFpbHMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3BlbkRyYXdlciA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9zZURyYXdlciA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmF2aWdhdGVUbyA9IChwYXRoOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZyB0b1wiLCBwYXRoKTtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbcGF0aF0sIHtcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVMZWZ0XCIsXHJcbiAgICAgICAgZHVyYXRpb246IDMwMFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19