"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var database_service_1 = require("~/services/database.service");
var AppGroceryListComponent = /** @class */ (function () {
    function AppGroceryListComponent(databaseService, page) {
        var _this = this;
        this.databaseService = databaseService;
        this.page = page;
        ///////////////////////////////////////////// GETTERS /////////////////////////////////////////////////
        this.getMyListsForPicker = function () {
            return !!_this.myLists ? _this.myLists.map(function (list) { return list.listName; }) : [];
        };
        ///////////////////////////////////////////// SERVICES /////////////////////////////////////////////////
        this.retrieveMyLists = function () {
            _this.databaseService.getMyLists().then(function (myLists) { return _this.myLists = !!myLists ? myLists : []; });
        };
        this.retrieveGroceryList = function () {
            if (!!_this.myLists && _this.myLists.length > 0) {
                var listId = _this.myLists[_this.myListsSelectedIndex].listId;
                _this.databaseService.getGroceryList(listId).then(function (groceryList) { return _this.groceryList = !!groceryList ? groceryList : []; });
            }
        };
        this.onSelectedIndexChange = function (picker) {
            if (!!picker) {
                // Update ListPicker index
                _this.myListsSelectedIndex = picker.selectedIndex;
            }
            _this.retrieveGroceryList();
        };
        // Init variables
        this.title = "My grocery list";
        this.showAddItemLayout = false;
        this.myListsSelectedIndex = 0;
        this.page.backgroundSpanUnderStatusBar = true;
        // Load data
        this.retrieveMyLists();
        this.retrieveGroceryList();
    }
    AppGroceryListComponent.prototype.ngOnInit = function () {
    };
    ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
    AppGroceryListComponent.prototype.isGroceryListEmpty = function () {
        return !this.groceryList;
    };
    ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
    AppGroceryListComponent.prototype.onItemTap = function (args) {
        console.log(this.groceryList[args.index].productName + " fa: Muuuu!");
        alert(this.groceryList[args.index].productName + " fa: Muuuu!");
    };
    AppGroceryListComponent.prototype.openAddItemForm = function () {
        if (!this.isGroceryListEmpty()) {
            this.showAddItemLayout = true;
        }
    };
    AppGroceryListComponent.prototype.addItem = function () {
        this.groceryList.push({
            barCode: "0123456",
            productName: "Bombolone alla crema"
        });
        this.showAddItemLayout = false;
        console.log("Added Item");
        alert("Added Item");
    };
    AppGroceryListComponent = __decorate([
        core_1.Component({
            selector: "app-grocery-list",
            templateUrl: "pages/landing-page/grocery-list/app-grocery-list.component.html",
            styleUrls: ["pages/landing-page/grocery-list/app-grocery-list.component.css"]
        }),
        __metadata("design:paramtypes", [database_service_1.DatabaseService, page_1.Page])
    ], AppGroceryListComponent);
    return AppGroceryListComponent;
}());
exports.AppGroceryListComponent = AppGroceryListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtZ3JvY2VyeS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUN6RSxzREFBcUQ7QUFDckQsZ0VBQThEO0FBTzlEO0lBT0UsaUNBQW9CLGVBQWdDLEVBQVMsSUFBVTtRQUF2RSxpQkFVQztRQVZtQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBZ0J2RSx1R0FBdUc7UUFDaEcsd0JBQW1CLEdBQUc7WUFDM0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsQ0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDLENBQUE7UUFHRCx3R0FBd0c7UUFDakcsb0JBQWUsR0FBRztZQUN2QixLQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQVksSUFBSyxPQUFBLEtBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQXZDLENBQXVDLENBQUMsQ0FBQztRQUNwRyxDQUFDLENBQUE7UUFFTSx3QkFBbUIsR0FBRztZQUMzQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxJQUFNLE1BQU0sR0FBVyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDdEUsS0FBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsV0FBZ0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQW5ELENBQW1ELENBQUMsQ0FBQztZQUM5SCxDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBZU0sMEJBQXFCLEdBQUcsVUFBQyxNQUFXO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNiLDBCQUEwQjtnQkFDMUIsS0FBSSxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFDbkQsQ0FBQztZQUVELEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQTtRQXJEQyxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUM7UUFFOUMsWUFBWTtRQUNaLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsMENBQVEsR0FBUjtJQUNBLENBQUM7SUFzQkQsd0dBQXdHO0lBQ2pHLG9EQUFrQixHQUF6QjtRQUNFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDM0IsQ0FBQztJQUdELHdHQUF3RztJQUNqRywyQ0FBUyxHQUFoQixVQUFpQixJQUFJO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxnQkFBYSxDQUFDLENBQUM7UUFDdEUsS0FBSyxDQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsZ0JBQWEsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFXTSxpREFBZSxHQUF0QjtRQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsQ0FBQztJQUNILENBQUM7SUFFTSx5Q0FBTyxHQUFkO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDcEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsV0FBVyxFQUFFLHNCQUFzQjtTQUNwQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBRS9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUIsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUE5RVUsdUJBQXVCO1FBTG5DLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSxpRUFBaUU7WUFDOUUsU0FBUyxFQUFFLENBQUMsZ0VBQWdFLENBQUM7U0FDOUUsQ0FBQzt5Q0FRcUMsa0NBQWUsRUFBZSxXQUFJO09BUDVELHVCQUF1QixDQStFbkM7SUFBRCw4QkFBQztDQUFBLEFBL0VELElBK0VDO0FBL0VZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2RhdGFiYXNlLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC1ncm9jZXJ5LWxpc3RcIixcclxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9sYW5kaW5nLXBhZ2UvZ3JvY2VyeS1saXN0L2FwcC1ncm9jZXJ5LWxpc3QuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2xhbmRpbmctcGFnZS9ncm9jZXJ5LWxpc3QvYXBwLWdyb2NlcnktbGlzdC5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBHcm9jZXJ5TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgcHVibGljIG15TGlzdHM6IEFycmF5PGFueT47XHJcbiAgcHVibGljIGdyb2NlcnlMaXN0OiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBzaG93QWRkSXRlbUxheW91dDogYm9vbGVhbjtcclxuICBwdWJsaWMgbXlMaXN0c1NlbGVjdGVkSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhYmFzZVNlcnZpY2U6IERhdGFiYXNlU2VydmljZSwgcHVibGljIHBhZ2U6IFBhZ2UpIHtcclxuICAgIC8vIEluaXQgdmFyaWFibGVzXHJcbiAgICB0aGlzLnRpdGxlID0gXCJNeSBncm9jZXJ5IGxpc3RcIjtcclxuICAgIHRoaXMuc2hvd0FkZEl0ZW1MYXlvdXQgPSBmYWxzZTtcclxuICAgIHRoaXMubXlMaXN0c1NlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgdGhpcy5wYWdlLmJhY2tncm91bmRTcGFuVW5kZXJTdGF0dXNCYXIgPSB0cnVlO1xyXG5cclxuICAgIC8vIExvYWQgZGF0YVxyXG4gICAgdGhpcy5yZXRyaWV2ZU15TGlzdHMoKTtcclxuICAgIHRoaXMucmV0cmlldmVHcm9jZXJ5TGlzdCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gR0VUVEVSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGdldE15TGlzdHNGb3JQaWNrZXIgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gISF0aGlzLm15TGlzdHMgPyB0aGlzLm15TGlzdHMubWFwKChsaXN0OiBhbnkpID0+IGxpc3QubGlzdE5hbWUpIDogW107XHJcbiAgfVxyXG5cclxuICBcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gU0VSVklDRVMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyByZXRyaWV2ZU15TGlzdHMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmRhdGFiYXNlU2VydmljZS5nZXRNeUxpc3RzKCkudGhlbigobXlMaXN0czogYW55KSA9PiB0aGlzLm15TGlzdHMgPSAhIW15TGlzdHMgPyBteUxpc3RzIDogW10pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldHJpZXZlR3JvY2VyeUxpc3QgPSAoKSA9PiB7XHJcbiAgICBpZiAoISF0aGlzLm15TGlzdHMgJiYgdGhpcy5teUxpc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgbGlzdElkOiBudW1iZXIgPSB0aGlzLm15TGlzdHNbdGhpcy5teUxpc3RzU2VsZWN0ZWRJbmRleF0ubGlzdElkO1xyXG4gICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS5nZXRHcm9jZXJ5TGlzdChsaXN0SWQpLnRoZW4oKGdyb2NlcnlMaXN0OiBhbnkpID0+IHRoaXMuZ3JvY2VyeUxpc3QgPSAhIWdyb2NlcnlMaXN0ID8gZ3JvY2VyeUxpc3QgOiBbXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gQ0hFQ0tFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBpc0dyb2NlcnlMaXN0RW1wdHkoKSB7XHJcbiAgICByZXR1cm4gIXRoaXMuZ3JvY2VyeUxpc3Q7XHJcbiAgfVxyXG5cclxuICBcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBIQU5ETEVSUy9BQ1RJT05TIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBvbkl0ZW1UYXAoYXJncykge1xyXG4gICAgY29uc29sZS5sb2coYCR7dGhpcy5ncm9jZXJ5TGlzdFthcmdzLmluZGV4XS5wcm9kdWN0TmFtZX0gZmE6IE11dXV1IWApO1xyXG4gICAgYWxlcnQoYCR7dGhpcy5ncm9jZXJ5TGlzdFthcmdzLmluZGV4XS5wcm9kdWN0TmFtZX0gZmE6IE11dXV1IWApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZSA9IChwaWNrZXI6IGFueSkgPT4ge1xyXG4gICAgaWYgKCEhcGlja2VyKSB7XHJcbiAgICAgIC8vIFVwZGF0ZSBMaXN0UGlja2VyIGluZGV4XHJcbiAgICAgIHRoaXMubXlMaXN0c1NlbGVjdGVkSW5kZXggPSBwaWNrZXIuc2VsZWN0ZWRJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJldHJpZXZlR3JvY2VyeUxpc3QoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvcGVuQWRkSXRlbUZvcm0oKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNHcm9jZXJ5TGlzdEVtcHR5KCkpIHtcclxuICAgICAgdGhpcy5zaG93QWRkSXRlbUxheW91dCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkSXRlbSgpIHtcclxuICAgIHRoaXMuZ3JvY2VyeUxpc3QucHVzaCh7XHJcbiAgICAgIGJhckNvZGU6IFwiMDEyMzQ1NlwiLFxyXG4gICAgICBwcm9kdWN0TmFtZTogXCJCb21ib2xvbmUgYWxsYSBjcmVtYVwiXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2hvd0FkZEl0ZW1MYXlvdXQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIkFkZGVkIEl0ZW1cIik7XHJcbiAgICBhbGVydChcIkFkZGVkIEl0ZW1cIik7XHJcbiAgfVxyXG59XHJcbiJdfQ==