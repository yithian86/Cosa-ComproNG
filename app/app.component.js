"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Toast = require("nativescript-toast");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.displayMessage = function (message, type) {
            if (type === "error") {
                console.error("##############################################################");
                console.error(message);
                console.error("##############################################################");
            }
            else {
                console.log("##############################################################");
                console.log(message);
                console.log("##############################################################");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQTRDO0FBTTVDO0lBRUU7UUFJTyxtQkFBYyxHQUFHLFVBQUMsT0FBZSxFQUFFLElBQWE7WUFDckQsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztnQkFDaEYsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO1lBQ2xGLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7Z0JBQzlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztZQUNoRixDQUFDO1lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUE7UUFmQywrQkFBK0I7SUFDakMsQ0FBQztJQUpVLFlBQVk7UUFKeEIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxZQUFZO1NBQzFCLENBQUM7O09BQ1csWUFBWSxDQW1CeEI7SUFBRCxtQkFBQztDQUFBLEFBbkJELElBbUJDO0FBbkJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSAnbmF0aXZlc2NyaXB0LXRvYXN0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC1yb290XCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9hcHAuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNwbGF5TWVzc2FnZSA9IChtZXNzYWdlOiBzdHJpbmcsIHR5cGU/OiBzdHJpbmcpID0+IHtcclxuICAgIGlmICh0eXBlID09PSBcImVycm9yXCIpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXCIpO1xyXG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBUb2FzdC5tYWtlVGV4dChtZXNzYWdlKS5zaG93KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==