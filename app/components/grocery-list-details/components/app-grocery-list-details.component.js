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
        this.goToMyGroceryLists = function () {
            console.log("Navigating to MyGroceryLists...");
            _this.routerExtensions.navigate(["/home/myGroceryLists"], {
                transition: {
                    name: "slideLeft",
                    duration: 300
                }
            });
        };
        // Init variables
        this.title = "My grocery list";
        this.isEditMode = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1ncm9jZXJ5LWxpc3QtZGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Y7QUFDL0Ysc0RBQXFEO0FBQ3JELG1GQUFpRjtBQUVqRixvR0FBbUg7QUFHbkgsa0pBQW1JO0FBQ25JLHNJQUF1SDtBQVN2SDtJQVdFLHdDQUNVLDJCQUF3RCxFQUN4RCx1QkFBZ0QsRUFDaEQsbUJBQXNDLEVBQ3RDLGdCQUFrQyxFQUNuQyxJQUFVO1FBTG5CLGlCQWNDO1FBYlMsZ0NBQTJCLEdBQTNCLDJCQUEyQixDQUE2QjtRQUN4RCw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDdEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNuQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBb0JuQix3R0FBd0c7UUFDakcsb0JBQWUsR0FBRztZQUN2QixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBUyxJQUFLLE9BQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixDQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzlFLENBQUMsQ0FBQTtRQUVNLHVCQUFrQixHQUFHO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsSUFBTSxTQUFTLEdBQWtCLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lB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SSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGlEQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsd0RBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7UUFDOUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUF4QmtDO1FBQWxDLGdCQUFTLENBQUMsK0NBQXNCLENBQUM7a0NBQXlCLCtDQUFzQjsyRUFBQztJQVR2RSw4QkFBOEI7UUFOMUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsV0FBVyxFQUFFLCtFQUErRTtZQUM1RixTQUFTLEVBQUUsQ0FBQywrRUFBK0UsQ0FBQztZQUM1RixTQUFTLEVBQUUsQ0FBQyx1RUFBMkIsRUFBRSwrREFBdUIsQ0FBQztTQUNsRSxDQUFDO3lDQWF1Qyx1RUFBMkI7WUFDL0IsK0RBQXVCO1lBQzNCLHdCQUFpQjtZQUNwQixvQ0FBZ0I7WUFDN0IsV0FBSTtPQWhCUiw4QkFBOEIsQ0FzSTFDO0lBQUQscUNBQUM7Q0FBQSxBQXRJRCxJQXNJQztBQXRJWSx3RUFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2VcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXIvcm91dGVyLWV4dGVuc2lvbnNcIjtcclxuXHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXIvc2lkZS1kcmF3ZXItZGlyZWN0aXZlc1wiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXInO1xyXG5cclxuaW1wb3J0IHsgR3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9ncm9jZXJ5LWxpc3QtZGV0YWlscy9zZXJ2aWNlcy9hcHAtZ3JvY2VyeS1saXN0LWRldGFpbHMuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNeUdyb2NlcnlMaXN0c0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvbXktZ3JvY2VyeS1saXN0cy9zZXJ2aWNlcy9hcHAtbXktZ3JvY2VyeS1saXN0cy5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzXCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiY29tcG9uZW50cy9ncm9jZXJ5LWxpc3QtZGV0YWlscy92aWV3cy9hcHAtZ3JvY2VyeS1saXN0LWRldGFpbHMuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImNvbXBvbmVudHMvZ3JvY2VyeS1saXN0LWRldGFpbHMvc3R5bGVzL2FwcC1ncm9jZXJ5LWxpc3QtZGV0YWlscy5jb21wb25lbnQuY3NzXCJdLFxyXG4gIHByb3ZpZGVyczogW0dyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZSwgTXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBHcm9jZXJ5TGlzdERldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBpc0VkaXRNb2RlOiBib29sZWFuO1xyXG4gIHB1YmxpYyBteUxpc3RzOiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBncm9jZXJ5TGlzdDogQXJyYXk8YW55PjtcclxuICBwdWJsaWMgc2VsZWN0ZWRMaXN0SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgcHJpdmF0ZSBkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XHJcblxyXG4gIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZTogR3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBteUdyb2NlcnlMaXN0c0RCU2VydmljZTogTXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2UsXHJcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHVibGljIHBhZ2U6IFBhZ2VcclxuICApIHtcclxuICAgIC8vIEluaXQgdmFyaWFibGVzXHJcbiAgICB0aGlzLnRpdGxlID0gXCJNeSBncm9jZXJ5IGxpc3RcIjtcclxuICAgIHRoaXMuaXNFZGl0TW9kZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RJbmRleCA9IDA7XHJcblxyXG4gICAgLy8gTG9hZCBncm9jZXJ5IGxpc3RzIGFuZCBzZWxlY3RlZCBncm9jZXJ5IGxpc3QgZGV0YWlsc1xyXG4gICAgdGhpcy5yZXRyaWV2ZU15TGlzdHMoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEdFVFRFUlMgQU5EIFNFVFRFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBnZXRNeUxpc3RzTmFtZXMgPSAoKTogQXJyYXk8c3RyaW5nPiA9PiB7XHJcbiAgICByZXR1cm4gISF0aGlzLm15TGlzdHMgPyB0aGlzLm15TGlzdHMubWFwKChsaXN0OiBhbnkpID0+IGxpc3QubGlzdE5hbWUpIDogW107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q3VycmVudExpc3ROYW1lID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAodGhpcy5teUxpc3RzICYmIHRoaXMubXlMaXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGxpc3ROYW1lczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuZ2V0TXlMaXN0c05hbWVzKCk7XHJcbiAgICAgIHJldHVybiBsaXN0TmFtZXNbdGhpcy5zZWxlY3RlZExpc3RJbmRleF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFNFUlZJQ0VTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgcmV0cmlldmVNeUxpc3RzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5teUdyb2NlcnlMaXN0c0RCU2VydmljZS5nZXRNeUxpc3RzKCkudGhlbigobXlMaXN0czogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMubXlMaXN0cyA9ICEhbXlMaXN0cyA/IG15TGlzdHMgOiBbXTtcclxuXHJcbiAgICAgIHRoaXMucmV0cmlldmVHcm9jZXJ5TGlzdERldGFpbHMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldHJpZXZlR3JvY2VyeUxpc3REZXRhaWxzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKCEhdGhpcy5teUxpc3RzICYmIHRoaXMubXlMaXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGxpc3RJZDogbnVtYmVyID0gdGhpcy5teUxpc3RzW3RoaXMuc2VsZWN0ZWRMaXN0SW5kZXhdLmxpc3RJZDtcclxuICAgICAgdGhpcy5ncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UuZ2V0R3JvY2VyeUxpc3REZXRhaWxzKGxpc3RJZCkudGhlbigoZ3JvY2VyeUxpc3Q6IGFueSkgPT4gdGhpcy5ncm9jZXJ5TGlzdCA9ICEhZ3JvY2VyeUxpc3QgPyBncm9jZXJ5TGlzdCA6IFtdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVHcm9jZXJ5TGlzdCA9IChwcm9kdWN0SW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgbGlzdElkOiBudW1iZXIgPSB0aGlzLm15TGlzdHNbdGhpcy5zZWxlY3RlZExpc3RJbmRleF0ubGlzdElkO1xyXG4gICAgY29uc3QgZ2xpc3RJZDogbnVtYmVyID0gdGhpcy5ncm9jZXJ5TGlzdFtwcm9kdWN0SW5kZXhdLmlkO1xyXG4gICAgY29uc3QgcHJvZHVjdElkOiBudW1iZXIgPSB0aGlzLmdyb2NlcnlMaXN0W3Byb2R1Y3RJbmRleF0ucHJvZHVjdElkO1xyXG4gICAgY29uc3QgcXVhbnRpdHk6IG51bWJlciA9IHRoaXMuZ3JvY2VyeUxpc3RbcHJvZHVjdEluZGV4XS5xdWFudGl0eTtcclxuICAgIGNvbnNvbGUubG9nKGBVcGRhdGluZyBlbGVtZW50ICMke3Byb2R1Y3RJbmRleH06ICR7bGlzdElkfSAke3Byb2R1Y3RJZH0gJHtxdWFudGl0eX1gKTtcclxuICAgIHRoaXMuZ3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlLnVwZGF0ZUdyb2NlcnlMaXN0RGV0YWlscyhnbGlzdElkLCBsaXN0SWQsIHByb2R1Y3RJZCwgcXVhbnRpdHkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlbGV0ZUdyb2NlcnlMaXN0SXRlbSA9IChwcm9kdWN0SW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgZ2xpc3RJZDogbnVtYmVyID0gdGhpcy5ncm9jZXJ5TGlzdFtwcm9kdWN0SW5kZXhdLmlkO1xyXG4gICAgY29uc29sZS5sb2coYERlbGV0aW5nIGVsZW1lbnQgIyR7cHJvZHVjdEluZGV4fWApO1xyXG4gICAgLy8gVXBkYXRlIERCXHJcbiAgICB0aGlzLmdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZS5kZWxldGVHcm9jZXJ5TGlzdEl0ZW0oZ2xpc3RJZCk7XHJcblxyXG4gICAgLy8gVXBkYXRlIGxpc3RcclxuICAgIHRoaXMuZ3JvY2VyeUxpc3Quc3BsaWNlKHByb2R1Y3RJbmRleCwgMSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIENIRUNLRVJTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgaXNHcm9jZXJ5TGlzdEVtcHR5ID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgcmV0dXJuICF0aGlzLmdyb2NlcnlMaXN0IHx8IHRoaXMuZ3JvY2VyeUxpc3QubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEhBTkRMRVJTL0FDVElPTlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIG9uSXRlbVRhcCA9IChhcmdzKTogdm9pZCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmdyb2NlcnlMaXN0W2FyZ3MuaW5kZXhdLnByb2R1Y3ROYW1lfSBmYTogTXV1dXUhYCk7XHJcbiAgICBhbGVydChgJHt0aGlzLmdyb2NlcnlMaXN0W2FyZ3MuaW5kZXhdLnByb2R1Y3ROYW1lfSBmYTogTXV1dXUhYCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25MaXN0SXRlbVRhcCA9IChsaXN0TmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBteUxpc3RzTmFtZXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLmdldE15TGlzdHNOYW1lcygpO1xyXG4gICAgaWYgKGxpc3ROYW1lICYmIG15TGlzdHNOYW1lcyAmJiBteUxpc3RzTmFtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyBVcGRhdGUgY3VycmVudCBsaXN0IGluZGV4XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SW5kZXggPSBteUxpc3RzTmFtZXMuaW5kZXhPZihsaXN0TmFtZSk7XHJcblxyXG4gICAgICB0aGlzLnJldHJpZXZlR3JvY2VyeUxpc3REZXRhaWxzKCk7XHJcblxyXG4gICAgICAvLyBDbG9zZSBkcmF3ZXJcclxuICAgICAgdGhpcy5jbG9zZURyYXdlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN3aXRjaEVkaXRNb2RlID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJPVUNIIVwiKTtcclxuICAgIHRoaXMuaXNFZGl0TW9kZSA9ICF0aGlzLmlzRWRpdE1vZGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3BlbkRyYXdlciA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9zZURyYXdlciA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ29Ub015R3JvY2VyeUxpc3RzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW5nIHRvIE15R3JvY2VyeUxpc3RzLi4uXCIpO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL215R3JvY2VyeUxpc3RzXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlTGVmdFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==