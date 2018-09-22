"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Toast = require("nativescript-toast");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.displayMessage = function (message, type) {
            if (type === "error") {
                console.error(message);
            }
            else {
                console.log(message);
            }
            Toast.makeText(message).show();
        };
        // page.actionBarHidden = true;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "app-root",
            templateUrl: "./app.html"
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQTRDO0FBTzVDO0lBRUU7UUFJTyxtQkFBYyxHQUFHLFVBQUMsT0FBZSxFQUFFLElBQWE7WUFDckQsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsQ0FBQyxDQUFBO1FBWEMsK0JBQStCO0lBQ2pDLENBQUM7SUFKVSxZQUFZO1FBSnhCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsWUFBWTtTQUMxQixDQUFDOztPQUNXLFlBQVksQ0FleEI7SUFBRCxtQkFBQztDQUFBLEFBZkQsSUFlQztBQWZZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSAnbmF0aXZlc2NyaXB0LXRvYXN0JztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLXJvb3RcIixcclxuICB0ZW1wbGF0ZVVybDogXCIuL2FwcC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc3BsYXlNZXNzYWdlID0gKG1lc3NhZ2U6IHN0cmluZywgdHlwZT86IHN0cmluZykgPT4ge1xyXG4gICAgaWYgKHR5cGUgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgVG9hc3QubWFrZVRleHQobWVzc2FnZSkuc2hvdygpO1xyXG4gIH1cclxufVxyXG4iXX0=