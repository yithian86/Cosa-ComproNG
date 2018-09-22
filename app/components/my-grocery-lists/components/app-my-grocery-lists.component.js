"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var app_my_grocery_lists_database_service_1 = require("~/components/my-grocery-lists/services/app-my-grocery-lists.database.service");
var AppMyGroceryListsComponent = /** @class */ (function () {
    function AppMyGroceryListsComponent(routerExtensions, myGroceryListsDBService) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        this.myGroceryListsDBService = myGroceryListsDBService;
        this.getDate = function (date) { return date > 0 ? new Date(date) : " - "; };
        this.retrieveMyLists = function () {
            _this.myGroceryListsDBService.getMyLists()
                .then(function (myListsRes) {
                _this.myLists = myListsRes ? myListsRes : [];
            })
                .catch(function (error) { return console.error(error); });
        };
        this.goToGroceryListDetails = function () {
            console.log("Navigating to MyGroceryLists...");
            _this.routerExtensions.navigate([""], {
                transition: {
                    name: "slideRight",
                    duration: 300
                }
            });
        };
    }
    AppMyGroceryListsComponent.prototype.ngOnInit = function () {
        this.retrieveMyLists();
    };
    AppMyGroceryListsComponent = __decorate([
        core_1.Component({
            selector: "app-my-grocery-lists",
            templateUrl: "components/my-grocery-lists/views/app-my-grocery-lists.component.html",
            styleUrls: ["components/my-grocery-lists/styles/app-my-grocery-lists.component.css"],
            providers: [app_my_grocery_lists_database_service_1.MyGroceryListsDBService]
        }),
        __metadata("design:paramtypes", [router_extensions_1.RouterExtensions,
            app_my_grocery_lists_database_service_1.MyGroceryListsDBService])
    ], AppMyGroceryListsComponent);
    return AppMyGroceryListsComponent;
}());
exports.AppMyGroceryListsComponent = AppMyGroceryListsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLW15LWdyb2NlcnktbGlzdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLW15LWdyb2NlcnktbGlzdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBQ2pFLG1GQUFpRjtBQUVqRixzSUFBdUg7QUFVdkg7SUFHRSxvQ0FDVSxnQkFBa0MsRUFDbEMsdUJBQWdEO1FBRjFELGlCQUdLO1FBRksscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBT25ELFlBQU8sR0FBRyxVQUFDLElBQVksSUFBSyxPQUFBLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQWpDLENBQWlDLENBQUE7UUFFN0Qsb0JBQWUsR0FBRztZQUN2QixLQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxFQUFFO2lCQUN0QyxJQUFJLENBQUMsVUFBQyxVQUF3QjtnQkFDN0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzlDLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFBO1FBRU0sMkJBQXNCLEdBQUc7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQy9DLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDbkMsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxZQUFZO29CQUNsQixRQUFRLEVBQUUsR0FBRztpQkFDZDthQUNGLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQTtJQXhCRyxDQUFDO0lBRUwsNkNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBVlUsMEJBQTBCO1FBTnRDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFdBQVcsRUFBRSx1RUFBdUU7WUFDcEYsU0FBUyxFQUFFLENBQUMsdUVBQXVFLENBQUM7WUFDcEYsU0FBUyxFQUFFLENBQUMsK0RBQXVCLENBQUM7U0FDckMsQ0FBQzt5Q0FLNEIsb0NBQWdCO1lBQ1QsK0RBQXVCO09BTC9DLDBCQUEwQixDQWdDdEM7SUFBRCxpQ0FBQztDQUFBLEFBaENELElBZ0NDO0FBaENZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXIvcm91dGVyLWV4dGVuc2lvbnNcIjtcclxuXHJcbmltcG9ydCB7IE15R3JvY2VyeUxpc3RzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9teS1ncm9jZXJ5LWxpc3RzL3NlcnZpY2VzL2FwcC1teS1ncm9jZXJ5LWxpc3RzLmRhdGFiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSUxpc3QgfSBmcm9tIFwifi9jb21wb25lbnRzL3R5cGluZ3MvbGlzdFwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC1teS1ncm9jZXJ5LWxpc3RzXCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiY29tcG9uZW50cy9teS1ncm9jZXJ5LWxpc3RzL3ZpZXdzL2FwcC1teS1ncm9jZXJ5LWxpc3RzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJjb21wb25lbnRzL215LWdyb2NlcnktbGlzdHMvc3R5bGVzL2FwcC1teS1ncm9jZXJ5LWxpc3RzLmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgcHJvdmlkZXJzOiBbTXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNeUdyb2NlcnlMaXN0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIG15TGlzdHM6IEFycmF5PElMaXN0PjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwcml2YXRlIG15R3JvY2VyeUxpc3RzREJTZXJ2aWNlOiBNeUdyb2NlcnlMaXN0c0RCU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5yZXRyaWV2ZU15TGlzdHMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXREYXRlID0gKGRhdGU6IG51bWJlcikgPT4gZGF0ZSA+IDAgPyBuZXcgRGF0ZShkYXRlKSA6IFwiIC0gXCJcclxuXHJcbiAgcHVibGljIHJldHJpZXZlTXlMaXN0cyA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMubXlHcm9jZXJ5TGlzdHNEQlNlcnZpY2UuZ2V0TXlMaXN0cygpXHJcbiAgICAgIC50aGVuKChteUxpc3RzUmVzOiBBcnJheTxJTGlzdD4pID0+IHtcclxuICAgICAgICB0aGlzLm15TGlzdHMgPSBteUxpc3RzUmVzID8gbXlMaXN0c1JlcyA6IFtdO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdvVG9Hcm9jZXJ5TGlzdERldGFpbHMgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG8gTXlHcm9jZXJ5TGlzdHMuLi5cIik7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlUmlnaHRcIixcclxuICAgICAgICBkdXJhdGlvbjogMzAwXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn0iXX0=