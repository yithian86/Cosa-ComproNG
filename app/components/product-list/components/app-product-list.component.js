"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var app_categories_database_service_1 = require("~/components/categories/services/app-categories.database.service");
var app_products_database_service_1 = require("~/components/product-list/services/app-products.database.service");
var AppProductListComponent = /** @class */ (function () {
    function AppProductListComponent(routerExtensions, categoriesDBService, productsDBService) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        this.categoriesDBService = categoriesDBService;
        this.productsDBService = productsDBService;
        //////////////////////////////////////// GETTERS AND SETTERS ///////////////////////////////////////////
        this.getProductListByCategory = function () { return _this.productListByCategory && _this.productListByCategory.length > 0 ? _this.productListByCategory : []; };
        this.getProductList = function (index) {
            if (_this.productListByCategory && _this.productListByCategory[index] && _this.productListByCategory[index].productList) {
                // console.log(JSON.stringify(this.productListByCategory[index]));
                return _this.productListByCategory[index].productList;
            }
            else {
                return [];
            }
        };
        this.getCategory = function (index) {
            if (_this.productListByCategory && _this.productListByCategory[index] && _this.productListByCategory[index].category) {
                return _this.productListByCategory[index].category;
            }
            else {
                return "-";
            }
        };
        this.getProductListHeight = function (index) {
            if (_this.productListByCategory && _this.productListByCategory[index] && _this.productListByCategory[index].productList) {
                return _this.productListByCategory[index].productList.length * 78;
            }
            else {
                return 0;
            }
        };
        this.getFilterByText = function () {
            if (_this.categoryList && _this.categoryList.length > 0) {
                return "Filter products by: " + _this.categoryList[_this.selectedCategoryIndex];
            }
            else {
                return "-";
            }
        };
        ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
        this.isProductListEmpty = function (index) {
            return !(_this.productListByCategory && _this.productListByCategory[index] && _this.productListByCategory[index].productList && _this.productListByCategory[index].productList.length > 0);
        };
        this.isProductListByCategoryEmpty = function () {
            return !(_this.productListByCategory && _this.productListByCategory.length > 0);
        };
        ///////////////////////////////////////////// SERVICES /////////////////////////////////////////////////
        this.retrieveProductListByCategory = function (category) {
            _this.productListByCategory = [];
            _this.productsDBService.getProducts(category)
                .then(function (productList) {
                if (productList && productList.length > 0) {
                    _this.productListByCategory.push({
                        category: category,
                        productList: productList
                    });
                }
            })
                .catch(function (error) { return console.error(error); });
        };
        this.retrieveProductList = function () {
            _this.categoriesDBService.getCategories()
                .then(function (categories) {
                _this.categoryList = categories;
                _this.categoryList.unshift("All");
                categories.forEach(function (category) {
                    _this.retrieveProductListByCategory(category);
                });
            })
                .catch(function (error) { return console.error(error); });
        };
        ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
        this.onCategorySelected = function (event) {
            if (event && event.object) {
                var picker = event.object;
                _this.selectedCategoryIndex = picker.selectedIndex;
            }
            else {
                if (_this.categoryList && _this.categoryList.length > 0) {
                    if (_this.selectedCategoryIndex === 0) {
                        // Show all products
                        _this.retrieveProductList();
                    }
                    else {
                        // Filter by a specific category
                        var selectedCategory = _this.categoryList[_this.selectedCategoryIndex];
                        _this.retrieveProductListByCategory(selectedCategory);
                    }
                    console.log("Filter list by:", _this.categoryList[_this.selectedCategoryIndex]);
                }
                _this.isFilterByOpened = false;
            }
        };
        this.onTapProduct = function () {
            console.log("TAPPED PRODUCT!");
        };
        this.goToGroceryListDetails = function () {
            console.log("Navigating to Grocery List Details...");
            _this.routerExtensions.navigate(["/home/groceryList/groceryListDetails"], {
                transition: {
                    name: "slideRight",
                    duration: 300
                }
            });
        };
        this.selectedCategoryIndex = 0;
        this.categoryList = [];
        this.productListByCategory = [];
    }
    AppProductListComponent.prototype.ngOnInit = function () {
        this.retrieveProductList();
    };
    AppProductListComponent = __decorate([
        core_1.Component({
            selector: "app-product-list",
            templateUrl: "components/product-list/views/app-product-list.component.html",
            styleUrls: ["components/product-list/styles/app-product-list.component.css"],
            providers: [app_categories_database_service_1.CategoriesDBService, app_products_database_service_1.ProductsDBService]
        }),
        __metadata("design:paramtypes", [router_extensions_1.RouterExtensions,
            app_categories_database_service_1.CategoriesDBService,
            app_products_database_service_1.ProductsDBService])
    ], AppProductListComponent);
    return AppProductListComponent;
}());
exports.AppProductListComponent = AppProductListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFHakYsb0hBQXVHO0FBQ3ZHLGtIQUFxRztBQVFyRztJQU9FLGlDQUNVLGdCQUFrQyxFQUNsQyxtQkFBd0MsRUFDeEMsaUJBQW9DO1FBSDlDLGlCQVFDO1FBUFMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFZOUMsd0dBQXdHO1FBQ2pHLDZCQUF3QixHQUFHLGNBQU0sT0FBQSxLQUFJLENBQUMscUJBQXFCLElBQUksS0FBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFyRyxDQUFxRyxDQUFDO1FBRXZJLG1CQUFjLEdBQUcsVUFBQyxLQUFhO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsSUFBSSxLQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JILGtFQUFrRTtnQkFDbEUsTUFBTSxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFDdkQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDWixDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBRU0sZ0JBQVcsR0FBRyxVQUFDLEtBQWE7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLHFCQUFx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ImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXIvcm91dGVyLWV4dGVuc2lvbnNcIjtcclxuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ1aS9saXN0LXBpY2tlclwiXHJcblxyXG5pbXBvcnQgeyBDYXRlZ29yaWVzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9jYXRlZ29yaWVzL3NlcnZpY2VzL2FwcC1jYXRlZ29yaWVzLmRhdGFiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUHJvZHVjdHNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9zZXJ2aWNlcy9hcHAtcHJvZHVjdHMuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLXByb2R1Y3QtbGlzdFwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvcHJvZHVjdC1saXN0L3ZpZXdzL2FwcC1wcm9kdWN0LWxpc3QuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImNvbXBvbmVudHMvcHJvZHVjdC1saXN0L3N0eWxlcy9hcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgcHJvdmlkZXJzOiBbQ2F0ZWdvcmllc0RCU2VydmljZSwgUHJvZHVjdHNEQlNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBQcm9kdWN0TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGNhdGVnb3J5TGlzdDogQXJyYXk8c3RyaW5nPjtcclxuICBwdWJsaWMgcHJvZHVjdExpc3RCeUNhdGVnb3J5OiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBzZWxlY3RlZENhdGVnb3J5SW5kZXg6IG51bWJlcjtcclxuICBwdWJsaWMgaXNGaWx0ZXJCeU9wZW5lZDogYm9vbGVhbjtcclxuICBwdWJsaWMgaXNBZGRQcm9kdWN0T3BlbmVkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHByaXZhdGUgY2F0ZWdvcmllc0RCU2VydmljZTogQ2F0ZWdvcmllc0RCU2VydmljZSxcclxuICAgIHByaXZhdGUgcHJvZHVjdHNEQlNlcnZpY2U6IFByb2R1Y3RzREJTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJbmRleCA9IDA7XHJcbiAgICB0aGlzLmNhdGVnb3J5TGlzdCA9IFtdO1xyXG4gICAgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgPSBbXTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5yZXRyaWV2ZVByb2R1Y3RMaXN0KCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBHRVRURVJTIEFORCBTRVRURVJTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5ID0gKCkgPT4gdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkubGVuZ3RoID4gMCA/IHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5IDogW107XHJcblxyXG4gIHB1YmxpYyBnZXRQcm9kdWN0TGlzdCA9IChpbmRleDogbnVtYmVyKTogQXJyYXk8YW55PiA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdCkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0pKTtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDYXRlZ29yeSA9IChpbmRleDogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLmNhdGVnb3J5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0uY2F0ZWdvcnk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UHJvZHVjdExpc3RIZWlnaHQgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XSAmJiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdC5sZW5ndGggKiA3ODtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEZpbHRlckJ5VGV4dCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLmNhdGVnb3J5TGlzdCAmJiB0aGlzLmNhdGVnb3J5TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBgRmlsdGVyIHByb2R1Y3RzIGJ5OiAke3RoaXMuY2F0ZWdvcnlMaXN0W3RoaXMuc2VsZWN0ZWRDYXRlZ29yeUluZGV4XX1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBDSEVDS0VSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGlzUHJvZHVjdExpc3RFbXB0eSA9IChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICByZXR1cm4gISh0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0ICYmIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdC5sZW5ndGggPiAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc1Byb2R1Y3RMaXN0QnlDYXRlZ29yeUVtcHR5ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuICEodGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkubGVuZ3RoID4gMCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFNFUlZJQ0VTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgcmV0cmlldmVQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgPSAoY2F0ZWdvcnk6IHN0cmluZykgPT4ge1xyXG4gICAgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgPSBbXTtcclxuXHJcbiAgICB0aGlzLnByb2R1Y3RzREJTZXJ2aWNlLmdldFByb2R1Y3RzKGNhdGVnb3J5KVxyXG4gICAgICAudGhlbigocHJvZHVjdExpc3Q6IEFycmF5PGFueT4pID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHByb2R1Y3RMaXN0ICYmIHByb2R1Y3RMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5LnB1c2goe1xyXG4gICAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnksXHJcbiAgICAgICAgICAgIHByb2R1Y3RMaXN0OiBwcm9kdWN0TGlzdFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldHJpZXZlUHJvZHVjdExpc3QgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmNhdGVnb3JpZXNEQlNlcnZpY2UuZ2V0Q2F0ZWdvcmllcygpXHJcbiAgICAgIC50aGVuKChjYXRlZ29yaWVzOiBBcnJheTxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3QgPSBjYXRlZ29yaWVzO1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlMaXN0LnVuc2hpZnQoXCJBbGxcIik7XHJcblxyXG4gICAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkoY2F0ZWdvcnkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gSEFORExFUlMvQUNUSU9OUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgb25DYXRlZ29yeVNlbGVjdGVkID0gKGV2ZW50PzogYW55KSA9PiB7XHJcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQub2JqZWN0KSB7XHJcbiAgICAgIGNvbnN0IHBpY2tlcjogYW55ID0gPExpc3RQaWNrZXI+ZXZlbnQub2JqZWN0O1xyXG4gICAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJbmRleCA9IHBpY2tlci5zZWxlY3RlZEluZGV4O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuY2F0ZWdvcnlMaXN0ICYmIHRoaXMuY2F0ZWdvcnlMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENhdGVnb3J5SW5kZXggPT09IDApIHtcclxuICAgICAgICAgIC8vIFNob3cgYWxsIHByb2R1Y3RzXHJcbiAgICAgICAgICB0aGlzLnJldHJpZXZlUHJvZHVjdExpc3QoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gRmlsdGVyIGJ5IGEgc3BlY2lmaWMgY2F0ZWdvcnlcclxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQ2F0ZWdvcnk6IHN0cmluZyA9IHRoaXMuY2F0ZWdvcnlMaXN0W3RoaXMuc2VsZWN0ZWRDYXRlZ29yeUluZGV4XTtcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkoc2VsZWN0ZWRDYXRlZ29yeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmlsdGVyIGxpc3QgYnk6XCIsIHRoaXMuY2F0ZWdvcnlMaXN0W3RoaXMuc2VsZWN0ZWRDYXRlZ29yeUluZGV4XSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pc0ZpbHRlckJ5T3BlbmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25UYXBQcm9kdWN0ID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJUQVBQRUQgUFJPRFVDVCFcIik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ29Ub0dyb2NlcnlMaXN0RGV0YWlscyA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZyB0byBHcm9jZXJ5IExpc3QgRGV0YWlscy4uLlwiKTtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9ncm9jZXJ5TGlzdC9ncm9jZXJ5TGlzdERldGFpbHNcIl0sIHtcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVSaWdodFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59Il19