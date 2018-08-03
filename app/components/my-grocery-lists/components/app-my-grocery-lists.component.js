"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
// import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
// import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
var app_my_grocery_lists_database_service_1 = require("~/components/my-grocery-lists/services/app-my-grocery-lists.database.service");
var AppMyGroceryListsComponent = /** @class */ (function () {
    function AppMyGroceryListsComponent(_changeDetectionRef, routerExtensions, page) {
        var _this = this;
        this._changeDetectionRef = _changeDetectionRef;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.addItem = function () {
            // this.groceryList.push({
            //   barCode: "0123456",
            //   productName: "Bombolone alla crema"
            // });
            console.log("Added Item");
            alert("Added Item");
        };
        this.goToGroceryListDetails = function () {
            console.log("Navigating to MyGroceryLists...");
            _this.routerExtensions.navigate(["/home/groceryListDetails"], {
                transition: {
                    name: "slideRight",
                    duration: 300
                }
            });
        };
    }
    AppMyGroceryListsComponent.prototype.ngOnInit = function () {
    };
    AppMyGroceryListsComponent.prototype.ngAfterViewInit = function () {
        this._changeDetectionRef.detectChanges();
    };
    AppMyGroceryListsComponent = __decorate([
        core_1.Component({
            selector: "app-my-grocery-lists",
            templateUrl: "components/my-grocery-lists/views/app-my-grocery-lists.component.html",
            styleUrls: ["components/my-grocery-lists/styles/app-my-grocery-lists.component.css"],
            providers: [app_my_grocery_lists_database_service_1.MyGroceryListsDBService]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            router_extensions_1.RouterExtensions,
            page_1.Page])
    ], AppMyGroceryListsComponent);
    return AppMyGroceryListsComponent;
}());
exports.AppMyGroceryListsComponent = AppMyGroceryListsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLW15LWdyb2NlcnktbGlzdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLW15LWdyb2NlcnktbGlzdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStGO0FBQy9GLHNEQUFxRDtBQUNyRCxtRkFBaUY7QUFFakYsc0hBQXNIO0FBQ3RILDhEQUE4RDtBQUU5RCxzSUFBdUg7QUFTdkg7SUFFRSxvQ0FDVSxtQkFBc0MsRUFDdEMsZ0JBQWtDLEVBQ25DLElBQVU7UUFIbkIsaUJBSUs7UUFISyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQ3RDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbkMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVVaLFlBQU8sR0FBRztZQUNmLDBCQUEwQjtZQUMxQix3QkFBd0I7WUFDeEIsd0NBQXdDO1lBQ3hDLE1BQU07WUFFTixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFCLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUE7UUFFTSwyQkFBc0IsR0FBRztZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLEVBQUU7Z0JBQzNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsUUFBUSxFQUFFLEdBQUc7aUJBQ2Q7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUE7SUEzQkcsQ0FBQztJQUVMLDZDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsb0RBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBYlUsMEJBQTBCO1FBTnRDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFdBQVcsRUFBRSx1RUFBdUU7WUFDcEYsU0FBUyxFQUFFLENBQUMsdUVBQXVFLENBQUM7WUFDcEYsU0FBUyxFQUFFLENBQUMsK0RBQXVCLENBQUM7U0FDckMsQ0FBQzt5Q0FJK0Isd0JBQWlCO1lBQ3BCLG9DQUFnQjtZQUM3QixXQUFJO09BTFIsMEJBQTBCLENBbUN0QztJQUFELGlDQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7QUFuQ1ksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBPbkluaXQsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyL3JvdXRlci1leHRlbnNpb25zXCI7XHJcblxyXG4vLyBpbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyL3NpZGUtZHJhd2VyLWRpcmVjdGl2ZXNcIjtcclxuLy8gaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcclxuXHJcbmltcG9ydCB7IE15R3JvY2VyeUxpc3RzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9teS1ncm9jZXJ5LWxpc3RzL3NlcnZpY2VzL2FwcC1teS1ncm9jZXJ5LWxpc3RzLmRhdGFiYXNlLnNlcnZpY2VcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJhcHAtbXktZ3JvY2VyeS1saXN0c1wiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvbXktZ3JvY2VyeS1saXN0cy92aWV3cy9hcHAtbXktZ3JvY2VyeS1saXN0cy5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiY29tcG9uZW50cy9teS1ncm9jZXJ5LWxpc3RzL3N0eWxlcy9hcHAtbXktZ3JvY2VyeS1saXN0cy5jb21wb25lbnQuY3NzXCJdLFxyXG4gIHByb3ZpZGVyczogW015R3JvY2VyeUxpc3RzREJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTXlHcm9jZXJ5TGlzdHNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwdWJsaWMgcGFnZTogUGFnZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRJdGVtID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgLy8gdGhpcy5ncm9jZXJ5TGlzdC5wdXNoKHtcclxuICAgIC8vICAgYmFyQ29kZTogXCIwMTIzNDU2XCIsXHJcbiAgICAvLyAgIHByb2R1Y3ROYW1lOiBcIkJvbWJvbG9uZSBhbGxhIGNyZW1hXCJcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiQWRkZWQgSXRlbVwiKTtcclxuICAgIGFsZXJ0KFwiQWRkZWQgSXRlbVwiKTtcclxuICB9XHJcbiAgXHJcbiAgcHVibGljIGdvVG9Hcm9jZXJ5TGlzdERldGFpbHMgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG8gTXlHcm9jZXJ5TGlzdHMuLi5cIik7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvZ3JvY2VyeUxpc3REZXRhaWxzXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlUmlnaHRcIixcclxuICAgICAgICBkdXJhdGlvbjogMzAwXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn0iXX0=