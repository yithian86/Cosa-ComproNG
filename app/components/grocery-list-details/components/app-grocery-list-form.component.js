"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var AppGroceryListFormComponent = /** @class */ (function () {
    function AppGroceryListFormComponent(routerExtensions) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        this.goToGroceryListDetails = function () {
            console.log("Navigating to MyGroceryLists...");
            _this.routerExtensions.navigate(["/home/groceryList/groceryListDetails"], {
                transition: {
                    name: "slideRight",
                    duration: 300
                }
            });
        };
    }
    AppGroceryListFormComponent.prototype.ngOnInit = function () { };
    AppGroceryListFormComponent = __decorate([
        core_1.Component({
            selector: "app-grocery-list-form",
            templateUrl: "components/grocery-list-details/views/app-grocery-list-form.component.html",
            styleUrls: ["components/grocery-list-details/styles/app-grocery-list-form.component.css"],
            providers: []
        }),
        __metadata("design:paramtypes", [router_extensions_1.RouterExtensions])
    ], AppGroceryListFormComponent);
    return AppGroceryListFormComponent;
}());
exports.AppGroceryListFormComponent = AppGroceryListFormComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1ncm9jZXJ5LWxpc3QtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsbUZBQWlGO0FBUWpGO0lBRUUscUNBQW9CLGdCQUFrQztRQUF0RCxpQkFBMkQ7UUFBdkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUkvQywyQkFBc0IsR0FBRztZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLHNDQUFzQyxDQUFDLEVBQUU7Z0JBQ3ZFLFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsUUFBUSxFQUFFLEdBQUc7aUJBQ2Q7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUE7SUFaeUQsQ0FBQztJQUUzRCw4Q0FBUSxHQUFSLGNBQWEsQ0FBQztJQUpILDJCQUEyQjtRQU52QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxXQUFXLEVBQUUsNEVBQTRFO1lBQ3pGLFNBQVMsRUFBRSxDQUFDLDRFQUE0RSxDQUFDO1lBQ3pGLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQzt5Q0FHc0Msb0NBQWdCO09BRjNDLDJCQUEyQixDQWV2QztJQUFELGtDQUFDO0NBQUEsQUFmRCxJQWVDO0FBZlksa0VBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9uc1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLWdyb2NlcnktbGlzdC1mb3JtXCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiY29tcG9uZW50cy9ncm9jZXJ5LWxpc3QtZGV0YWlscy92aWV3cy9hcHAtZ3JvY2VyeS1saXN0LWZvcm0uY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImNvbXBvbmVudHMvZ3JvY2VyeS1saXN0LWRldGFpbHMvc3R5bGVzL2FwcC1ncm9jZXJ5LWxpc3QtZm9ybS5jb21wb25lbnQuY3NzXCJdLFxyXG4gIHByb3ZpZGVyczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcEdyb2NlcnlMaXN0Rm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkgeyB9XHJcblxyXG4gIHB1YmxpYyBnb1RvR3JvY2VyeUxpc3REZXRhaWxzID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW5nIHRvIE15R3JvY2VyeUxpc3RzLi4uXCIpO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL2dyb2NlcnlMaXN0L2dyb2NlcnlMaXN0RGV0YWlsc1wiXSwge1xyXG4gICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogXCJzbGlkZVJpZ2h0XCIsXHJcbiAgICAgICAgZHVyYXRpb246IDMwMFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iXX0=