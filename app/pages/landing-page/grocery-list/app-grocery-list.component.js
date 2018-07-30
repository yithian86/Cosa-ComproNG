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
        this.openDrawer = function () {
            _this.drawer.showDrawer();
        };
        this.closeDrawer = function () {
            _this.drawer.closeDrawer();
        };
        // Init variables
        this.title = "My grocery list";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtZ3JvY2VyeS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRjtBQUMvRixzREFBcUQ7QUFDckQsZ0VBQThEO0FBRTlELDhEQUE0RjtBQVE1RjtJQVlFLGlDQUNVLGVBQWdDLEVBQ2pDLElBQVUsRUFDVCxtQkFBc0M7UUFIaEQsaUJBYUM7UUFaUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDakMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNULHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFxQmhELHdHQUF3RztRQUNqRyxvQkFBZSxHQUFHO1lBQ3ZCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFTLElBQUssT0FBQSxJQUFJLENBQUMsUUFBUSxFQUFiLENBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQyxDQUFBO1FBRU0sdUJBQWtCLEdBQUc7WUFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFNLFNBQVMsR0FBa0IsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4RCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2IsQ0FBQztRQUNILENBQUMsQ0FBQTtRQUdELHdHQUF3RztRQUNqRyxvQkFBZSxHQUFHO1lBQ3ZCLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUMs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R0MsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBRTlDLHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDBDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsaURBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7UUFDOUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUF2QmtDO1FBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7a0NBQXlCLGdDQUFzQjtvRUFBQztJQVZ2RSx1QkFBdUI7UUFMbkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLGlFQUFpRTtZQUM5RSxTQUFTLEVBQUUsQ0FBQyxnRUFBZ0UsQ0FBQztTQUM5RSxDQUFDO3lDQWMyQixrQ0FBZTtZQUMzQixXQUFJO1lBQ1ksd0JBQWlCO09BZnJDLHVCQUF1QixDQXFIbkM7SUFBRCw4QkFBQztDQUFBLEFBckhELElBcUhDO0FBckhZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJhcHAtZ3JvY2VyeS1saXN0XCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbGFuZGluZy1wYWdlL2dyb2NlcnktbGlzdC9hcHAtZ3JvY2VyeS1saXN0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9sYW5kaW5nLXBhZ2UvZ3JvY2VyeS1saXN0L2FwcC1ncm9jZXJ5LWxpc3QuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwR3JvY2VyeUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBteUxpc3RzOiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBncm9jZXJ5TGlzdDogQXJyYXk8YW55PjtcclxuICBwdWJsaWMgc2hvd0FkZEl0ZW1MYXlvdXQ6IGJvb2xlYW47XHJcbiAgcHVibGljIHNlbGVjdGVkTGlzdEluZGV4OiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xyXG4gIHByaXZhdGUgX21haW5Db250ZW50VGV4dDogc3RyaW5nO1xyXG5cclxuICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBkYXRhYmFzZVNlcnZpY2U6IERhdGFiYXNlU2VydmljZSxcclxuICAgIHB1YmxpYyBwYWdlOiBQYWdlLFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge1xyXG4gICAgLy8gSW5pdCB2YXJpYWJsZXNcclxuICAgIHRoaXMudGl0bGUgPSBcIk15IGdyb2NlcnkgbGlzdFwiO1xyXG4gICAgdGhpcy5zaG93QWRkSXRlbUxheW91dCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RJbmRleCA9IDA7XHJcbiAgICB0aGlzLnBhZ2UuYmFja2dyb3VuZFNwYW5VbmRlclN0YXR1c0JhciA9IHRydWU7XHJcblxyXG4gICAgLy8gTG9hZCBncm9jZXJ5IGxpc3RzIGFuZCBzZWxlY3RlZCBncm9jZXJ5IGxpc3QgZGV0YWlsc1xyXG4gICAgdGhpcy5yZXRyaWV2ZU15TGlzdHMoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEdFVFRFUlMgQU5EIFNFVFRFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBnZXRNeUxpc3RzTmFtZXMgPSAoKTogQXJyYXk8c3RyaW5nPiA9PiB7XHJcbiAgICByZXR1cm4gISF0aGlzLm15TGlzdHMgPyB0aGlzLm15TGlzdHMubWFwKChsaXN0OiBhbnkpID0+IGxpc3QubGlzdE5hbWUpIDogW107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q3VycmVudExpc3ROYW1lID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAodGhpcy5teUxpc3RzICYmIHRoaXMubXlMaXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGxpc3ROYW1lczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuZ2V0TXlMaXN0c05hbWVzKCk7XHJcbiAgICAgIHJldHVybiBsaXN0TmFtZXNbdGhpcy5zZWxlY3RlZExpc3RJbmRleF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFNFUlZJQ0VTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgcmV0cmlldmVNeUxpc3RzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuZ2V0TXlMaXN0cygpLnRoZW4oKG15TGlzdHM6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLm15TGlzdHMgPSAhIW15TGlzdHMgPyBteUxpc3RzIDogW107XHJcblxyXG4gICAgICB0aGlzLnJldHJpZXZlR3JvY2VyeUxpc3REZXRhaWxzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXRyaWV2ZUdyb2NlcnlMaXN0RGV0YWlscyA9ICgpOiB2b2lkID0+IHtcclxuICAgIGlmICghIXRoaXMubXlMaXN0cyAmJiB0aGlzLm15TGlzdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBsaXN0SWQ6IG51bWJlciA9IHRoaXMubXlMaXN0c1t0aGlzLnNlbGVjdGVkTGlzdEluZGV4XS5saXN0SWQ7XHJcbiAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLmdldEdyb2NlcnlMaXN0RGV0YWlscyhsaXN0SWQpLnRoZW4oKGdyb2NlcnlMaXN0OiBhbnkpID0+IHRoaXMuZ3JvY2VyeUxpc3QgPSAhIWdyb2NlcnlMaXN0ID8gZ3JvY2VyeUxpc3QgOiBbXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIENIRUNLRVJTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgaXNHcm9jZXJ5TGlzdEVtcHR5ID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgcmV0dXJuICF0aGlzLmdyb2NlcnlMaXN0IHx8IHRoaXMuZ3JvY2VyeUxpc3QubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEhBTkRMRVJTL0FDVElPTlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIG9uSXRlbVRhcCA9IChhcmdzKTogdm9pZCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmdyb2NlcnlMaXN0W2FyZ3MuaW5kZXhdLnByb2R1Y3ROYW1lfSBmYTogTXV1dXUhYCk7XHJcbiAgICBhbGVydChgJHt0aGlzLmdyb2NlcnlMaXN0W2FyZ3MuaW5kZXhdLnByb2R1Y3ROYW1lfSBmYTogTXV1dXUhYCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25MaXN0SXRlbVRhcCA9IChsaXN0TmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBteUxpc3RzTmFtZXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLmdldE15TGlzdHNOYW1lcygpO1xyXG4gICAgaWYgKGxpc3ROYW1lICYmIG15TGlzdHNOYW1lcyAmJiBteUxpc3RzTmFtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyBVcGRhdGUgY3VycmVudCBsaXN0IGluZGV4XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SW5kZXggPSBteUxpc3RzTmFtZXMuaW5kZXhPZihsaXN0TmFtZSk7XHJcblxyXG4gICAgICB0aGlzLnJldHJpZXZlR3JvY2VyeUxpc3REZXRhaWxzKCk7XHJcblxyXG4gICAgICAvLyBDbG9zZSBkcmF3ZXJcclxuICAgICAgdGhpcy5jbG9zZURyYXdlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9wZW5BZGRJdGVtRm9ybSA9ICgpOiB2b2lkID0+IHtcclxuICAgIGlmICghIXRoaXMuZ3JvY2VyeUxpc3QpIHtcclxuICAgICAgdGhpcy5zaG93QWRkSXRlbUxheW91dCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkSXRlbSA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZ3JvY2VyeUxpc3QucHVzaCh7XHJcbiAgICAgIGJhckNvZGU6IFwiMDEyMzQ1NlwiLFxyXG4gICAgICBwcm9kdWN0TmFtZTogXCJCb21ib2xvbmUgYWxsYSBjcmVtYVwiXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2hvd0FkZEl0ZW1MYXlvdXQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIkFkZGVkIEl0ZW1cIik7XHJcbiAgICBhbGVydChcIkFkZGVkIEl0ZW1cIik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3BlbkRyYXdlciA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9zZURyYXdlciA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==