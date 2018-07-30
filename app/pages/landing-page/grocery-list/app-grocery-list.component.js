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
    ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
    AppGroceryListComponent.prototype.isGroceryListEmpty = function () {
        return !this.groceryList || this.groceryList.length === 0;
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
    AppGroceryListComponent.prototype.openDrawer = function () {
        this.drawer.showDrawer();
    };
    AppGroceryListComponent.prototype.closeDrawer = function () {
        this.drawer.closeDrawer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtZ3JvY2VyeS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRjtBQUMvRixzREFBcUQ7QUFDckQsZ0VBQThEO0FBRTlELDhEQUE0RjtBQVE1RjtJQVlFLGlDQUNVLGVBQWdDLEVBQ2pDLElBQVUsRUFDVCxtQkFBc0M7UUFIaEQsaUJBYUM7UUFaUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDakMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNULHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFxQmhELHdHQUF3RztRQUNqRyxvQkFBZSxHQUFHO1lBQ3ZCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFTLElBQUssT0FBQSxJQUFJLENBQUMsUUFBUSxFQUFiLENBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQyxDQUFBO1FBRU0sdUJBQWtCLEdBQUc7WUFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFNLFNBQVMsR0FBa0IsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4RCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2IsQ0FBQztRQUNILENBQUMsQ0FBQTtRQUdELHdHQUF3RztRQUNqRyxvQkFBZSxHQUFHO1lBQ3ZCLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUMs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ZDtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFdBQVcsRUFBRSxzQkFBc0I7U0FDcEMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUUvQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRU0sNENBQVUsR0FBakI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSw2Q0FBVyxHQUFsQjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQTFHa0M7UUFBbEMsZ0JBQVMsQ0FBQyxnQ0FBc0IsQ0FBQztrQ0FBeUIsZ0NBQXNCO29FQUFDO0lBVnZFLHVCQUF1QjtRQUxuQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsaUVBQWlFO1lBQzlFLFNBQVMsRUFBRSxDQUFDLGdFQUFnRSxDQUFDO1NBQzlFLENBQUM7eUNBYzJCLGtDQUFlO1lBQzNCLFdBQUk7WUFDWSx3QkFBaUI7T0FmckMsdUJBQXVCLENBcUhuQztJQUFELDhCQUFDO0NBQUEsQUFySEQsSUFxSEM7QUFySFksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBPbkluaXQsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2RhdGFiYXNlLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC1ncm9jZXJ5LWxpc3RcIixcclxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9sYW5kaW5nLXBhZ2UvZ3JvY2VyeS1saXN0L2FwcC1ncm9jZXJ5LWxpc3QuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2xhbmRpbmctcGFnZS9ncm9jZXJ5LWxpc3QvYXBwLWdyb2NlcnktbGlzdC5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBHcm9jZXJ5TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XHJcbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgcHVibGljIG15TGlzdHM6IEFycmF5PGFueT47XHJcbiAgcHVibGljIGdyb2NlcnlMaXN0OiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBzaG93QWRkSXRlbUxheW91dDogYm9vbGVhbjtcclxuICBwdWJsaWMgc2VsZWN0ZWRMaXN0SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgcHJpdmF0ZSBkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XHJcbiAgcHJpdmF0ZSBfbWFpbkNvbnRlbnRUZXh0OiBzdHJpbmc7XHJcblxyXG4gIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlU2VydmljZTogRGF0YWJhc2VTZXJ2aWNlLFxyXG4gICAgcHVibGljIHBhZ2U6IFBhZ2UsXHJcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICAvLyBJbml0IHZhcmlhYmxlc1xyXG4gICAgdGhpcy50aXRsZSA9IFwiTXkgZ3JvY2VyeSBsaXN0XCI7XHJcbiAgICB0aGlzLnNob3dBZGRJdGVtTGF5b3V0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdEluZGV4ID0gMDtcclxuICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kU3BhblVuZGVyU3RhdHVzQmFyID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBMb2FkIGdyb2NlcnkgbGlzdHMgYW5kIHNlbGVjdGVkIGdyb2NlcnkgbGlzdCBkZXRhaWxzXHJcbiAgICB0aGlzLnJldHJpZXZlTXlMaXN0cygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gR0VUVEVSUyBBTkQgU0VUVEVSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGdldE15TGlzdHNOYW1lcyA9ICgpOiBBcnJheTxzdHJpbmc+ID0+IHtcclxuICAgIHJldHVybiAhIXRoaXMubXlMaXN0cyA/IHRoaXMubXlMaXN0cy5tYXAoKGxpc3Q6IGFueSkgPT4gbGlzdC5saXN0TmFtZSkgOiBbXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDdXJyZW50TGlzdE5hbWUgPSAoKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh0aGlzLm15TGlzdHMgJiYgdGhpcy5teUxpc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgbGlzdE5hbWVzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5nZXRNeUxpc3RzTmFtZXMoKTtcclxuICAgICAgcmV0dXJuIGxpc3ROYW1lc1t0aGlzLnNlbGVjdGVkTGlzdEluZGV4XTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBcIi1cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gU0VSVklDRVMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyByZXRyaWV2ZU15TGlzdHMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmRhdGFiYXNlU2VydmljZS5nZXRNeUxpc3RzKCkudGhlbigobXlMaXN0czogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMubXlMaXN0cyA9ICEhbXlMaXN0cyA/IG15TGlzdHMgOiBbXTtcclxuXHJcbiAgICAgIHRoaXMucmV0cmlldmVHcm9jZXJ5TGlzdERldGFpbHMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldHJpZXZlR3JvY2VyeUxpc3REZXRhaWxzID0gKCkgPT4ge1xyXG4gICAgaWYgKCEhdGhpcy5teUxpc3RzICYmIHRoaXMubXlMaXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGxpc3RJZDogbnVtYmVyID0gdGhpcy5teUxpc3RzW3RoaXMuc2VsZWN0ZWRMaXN0SW5kZXhdLmxpc3RJZDtcclxuICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuZ2V0R3JvY2VyeUxpc3REZXRhaWxzKGxpc3RJZCkudGhlbigoZ3JvY2VyeUxpc3Q6IGFueSkgPT4gdGhpcy5ncm9jZXJ5TGlzdCA9ICEhZ3JvY2VyeUxpc3QgPyBncm9jZXJ5TGlzdCA6IFtdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gQ0hFQ0tFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBpc0dyb2NlcnlMaXN0RW1wdHkoKSB7XHJcbiAgICByZXR1cm4gIXRoaXMuZ3JvY2VyeUxpc3QgfHwgdGhpcy5ncm9jZXJ5TGlzdC5sZW5ndGggPT09IDA7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gSEFORExFUlMvQUNUSU9OUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgb25JdGVtVGFwKGFyZ3MpIHtcclxuICAgIGNvbnNvbGUubG9nKGAke3RoaXMuZ3JvY2VyeUxpc3RbYXJncy5pbmRleF0ucHJvZHVjdE5hbWV9IGZhOiBNdXV1dSFgKTtcclxuICAgIGFsZXJ0KGAke3RoaXMuZ3JvY2VyeUxpc3RbYXJncy5pbmRleF0ucHJvZHVjdE5hbWV9IGZhOiBNdXV1dSFgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkxpc3RJdGVtVGFwID0gKGxpc3ROYW1lOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IG15TGlzdHNOYW1lczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuZ2V0TXlMaXN0c05hbWVzKCk7XHJcbiAgICBpZiAobGlzdE5hbWUgJiYgbXlMaXN0c05hbWVzICYmIG15TGlzdHNOYW1lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIFVwZGF0ZSBjdXJyZW50IGxpc3QgaW5kZXhcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJbmRleCA9IG15TGlzdHNOYW1lcy5pbmRleE9mKGxpc3ROYW1lKTtcclxuXHJcbiAgICAgIHRoaXMucmV0cmlldmVHcm9jZXJ5TGlzdERldGFpbHMoKTtcclxuXHJcbiAgICAgIC8vIENsb3NlIGRyYXdlclxyXG4gICAgICB0aGlzLmNsb3NlRHJhd2VyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3BlbkFkZEl0ZW1Gb3JtKCkge1xyXG4gICAgaWYgKCF0aGlzLmlzR3JvY2VyeUxpc3RFbXB0eSgpKSB7XHJcbiAgICAgIHRoaXMuc2hvd0FkZEl0ZW1MYXlvdXQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEl0ZW0oKSB7XHJcbiAgICB0aGlzLmdyb2NlcnlMaXN0LnB1c2goe1xyXG4gICAgICBiYXJDb2RlOiBcIjAxMjM0NTZcIixcclxuICAgICAgcHJvZHVjdE5hbWU6IFwiQm9tYm9sb25lIGFsbGEgY3JlbWFcIlxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNob3dBZGRJdGVtTGF5b3V0ID0gZmFsc2U7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJBZGRlZCBJdGVtXCIpO1xyXG4gICAgYWxlcnQoXCJBZGRlZCBJdGVtXCIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9wZW5EcmF3ZXIoKSB7XHJcbiAgICB0aGlzLmRyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xvc2VEcmF3ZXIoKSB7XHJcbiAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xyXG4gIH1cclxufVxyXG4iXX0=